import express from "express";
import db from "@repo/db/client";

const app = express();

const PORT = 3003;

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.userId,
        },
        data: {
          Status: "Success",
        },
      }),
    ]);

    res.json({
      message:"Captured"
    })
  } catch (error) {
    console.log(error)
    await db.onRampTransaction.update({
      where: {
        token: paymentInformation.userId,
      },
      data: {
        Status: "Failed",
      },
    });

    res.status(411).json({
      message:"Error while Processing webhook"
    })
  }
});

app.listen(PORT);
