const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all of a user's addresses

router.get("/:id", async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        userId: +req.params.id,
      },
    });
    if (addresses.length >= 1) {
      res.status(200).json(addresses);
    } else {
      res.status(404).json({ message: "No address on file" });
    }
  } catch (error) {
    next(error);
  }
});

// Add a new address

router.post("/new", async (req, res, next) => {
  try {
    const { userId, unit, street, city, state, zip, country } = req.body;
    const newAddress = await prisma.address.create({
      data: {
        userId,
        unit,
        street,
        city,
        state,
        zip,
        country,
      },
    });
    res.status(200).json(newAddress);
  } catch (error) {
    next(error);
  }
});

// Update an address

router.put("/update/:id", async (req, res, next) => {
  try {
    const { unit, street, city, state, zip, country } = req.body;

    const foundAddress = await prisma.address.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!foundAddress) {
      res.status(404).json({ message: "Address does not exist" });
      return;
    }

    const updatedAddress = await prisma.address.update({
      where: {
        id: +req.params.id,
      },
      data: {
        unit,
        street,
        city,
        state,
        zip,
        country,
      },
    });
    res.status(200).json(updatedAddress);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
