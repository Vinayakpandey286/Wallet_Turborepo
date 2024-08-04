import express from "express";
import db from "@repo/db/client";

const app = express();

const PORT = 3003;

app.use(express.json());

app.post("/hdfcWebhook", (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_indentifier,
    amount: req.body.amount,
  };

  db.balance.create;
});

app.listen(PORT);
