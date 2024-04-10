const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all Products

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await prisma.product.findMany();
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
});

// Get Product by id

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await prisma.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (singleProduct) {
      res.status(200).json(singleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
