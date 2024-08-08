"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card
          title="Send"
          className="border-2 rounded-s-md border-black-700 drop-shadow-md p-4 "
        >
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              type="text"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(Number(value));
              }}
            />
            <div className="pt-4 flex items-center flex-col w-full">
              <Button
                className="bg-[#6a36e3] text-white p-2 rounded-lg w-[5rem]"
                onClick={async () => {
                  const result = await p2pTransfer(number, amount*100);
                  setMessage(result?.message);
                }}
              >
                Send
              </Button>
              <div className="text-[#6a36e3] p-2">{message}</div>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
