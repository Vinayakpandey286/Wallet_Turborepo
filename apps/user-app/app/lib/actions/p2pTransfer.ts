"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  try {
    //this is not safe because one user can send request simuntaneouly which bypasses the checking the
    // amount for this we can use locking in databases
    await prisma.$transaction(async (tx) => {
      console.log(from);
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`; // locking the row

      const fromBalance = await tx.balance.findUnique({
        where: { userId: from },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: from },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: from,
          toUserId: toUser?.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      message: "Transaction Done",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error while Transfering Moeny",
    };
  }
}
