import express from "express";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_indentifier,
    amount: req.body.amount,
  };
});
