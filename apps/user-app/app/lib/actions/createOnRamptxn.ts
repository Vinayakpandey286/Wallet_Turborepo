"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const createOnRampTransaction = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user?.id) {
    return {
      message: "Unauthenticated Request",
    };
  }
  const token = (Math.random() * 1000).toString();

  await prisma.onRampTransaction.create({
    data: {
      provider,
      amount,
      Status: "Processing",
      startTime: new Date(),
      token,
      userId: user?.id,
    },
  });

  return {
    message: "Done",
  };
};
