import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Home() {
  return <div className="text-2xl text-center">Hi there</div>;
}
