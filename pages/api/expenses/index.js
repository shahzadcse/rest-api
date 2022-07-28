import prisma from "lib/prisma";

export default async function handler(req, res) {
  // GET endpoint
  if (req.method === "GET") {
    return res.status(200).json(req.body);
  }
  // POST endpoint
  if (req.method === "POST") {
    const { trip, name, date, amount, currency } = req.body;

    if (!trip) {
      return res.status(400).json("Missing parameter - 'trip'");
    }
    if (!name) {
      return res.status(400).json("Missing parameter - 'name'");
    }
    if (!amount) {
      return res.status(400).json("Missing parameter - 'amount'");
    }
    if (!currency) {
      return res.status(400).json("Missing parameter - 'currency'");
    }

    await prisma.expense.create({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
    });

    return res.status(200).end();
  }

  res.status(405).json({
    message: "Method not allowed!",
  });
}
