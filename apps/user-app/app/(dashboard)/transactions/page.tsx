import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.Status,
    provider: t.provider,
  }));
}

export default async function () {
  const transactions = await getOnRampTransactions();

  console.log(transactions, "hi")

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a36e3] pt-8 mb-8 font-bold">
        Transaction
      </div>
      <div className="pt-4 flex flex-col items-center">
        <OnRampTransactions transactions={transactions} title="Recent Transaction" />
        <OnRampTransactions transactions={transactions}  title="P2P Transfers"/>
      </div>
    </div>
  );
}
