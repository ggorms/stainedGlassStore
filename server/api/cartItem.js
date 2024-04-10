const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add a product to user's cart

router.post("/add", async (req, res, next) => {
  try {
    const { cartId, productId } = req.body;
    const cartItemExists = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
    // If product is already in cart, increase quantity by 1
    if (cartItemExists) {
      const updateQuanity = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
        data: {
          qty: cartItemExists.qty + 1,
        },
      });
      res.status(200).json(updateQuanity);
    }
    // If product is not already in cart, add it
    else {
      const addProduct = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          qty: 1,
        },
      });
      res.status(201).json(addProduct);
    }
  } catch (error) {
    next(error);
  }
});

// Remove item from cart

router.delete("/remove", async (req, res, next) => {
  try {
    const { cartId, productId } = req.body;
    const removedItem = await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
    res.status(200).json(removedItem);
  } catch (error) {
    res.status(404).json({ message: "Cart item does not exist" });
  }
});

// Update quantity of cart item

router.put("/update", async (req, res, next) => {
  try {
    const { cartId, productId, qty } = req.body;
    const updatedQuanity = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      data: {
        qty,
      },
    });
    res.status(200).json(updatedQuanity);
  } catch (error) {
    res.status(404).json({ message: "Cart item does not exist" });
  }
});

module.exports = router;
