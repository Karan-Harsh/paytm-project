import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcbankwebhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_Identifier,
    amount: req.body.amount,
  };
  await db.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: {
        increment: paymentInformation.amount,
      },
    },
  });
  db.onRampTransaction.update({
    where: {
      token: paymentInformation.token,
    },
    data: {
      status: "Success",
    },
  });
  res.json({
    message: "Captured",
  });
});
