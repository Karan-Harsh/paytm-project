import express from "express";

const app = express();

app.post("/hdfcbankwebhook", (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_Identifier,
    amount: req.body.amount,
  };
});
