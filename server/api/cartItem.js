const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add a product to a user's cart. If product already exists, increase quantity. Return updated cart.

router.post("/add", async (req, res, next) => {
  try {
    const { cartId, CartItems } = req.body;
    await Promise.all(
      CartItems.map(async (item) => {
        return await prisma.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId,
              productId: item.product.id,
            },
          },
          update: {
            qty: {
              increment: item.qty,
            },
          },
          create: {
            cartId,
            productId: item.product.id,
            qty: item.qty,
          },
        });
      })
    );
    const updatedCart = await prisma.cartItem.findMany({
      where: {
        cartId,
      },
      select: {
        qty: true,
        product: {
          select: {
            id: true,
            name: true,
            imageId: true,
            price: true,
            stockQty: true,
          },
        },
      },
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
});

// Remove item from cart

router.delete("/remove/:cartId/:productId", async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const removedItem = await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: +cartId,
          productId: +productId,
        },
      },
      select: {
        qty: true,
        product: {
          select: {
            id: true,
            name: true,
            imageId: true,
            price: true,
            stockQty: true,
          },
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
      select: {
        qty: true,
        product: {
          select: {
            id: true,
            name: true,
            imageId: true,
            price: true,
            stockQty: true,
          },
        },
      },
    });
    res.status(200).json(updatedQuanity);
  } catch (error) {
    res.status(404).json({ message: "Cart item does not exist" });
  }
});

module.exports = router;
