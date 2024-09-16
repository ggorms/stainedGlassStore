const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get user's active cart by userId

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: +req.params.id,
        isFulfilled: false,
      },
      select: {
        id: true,
        userId: true,
        isFulfilled: true,
        CartItem: {
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
        },
      },
    });

    if (!cart) {
      res.status(404).json({ message: "User does not have an active cart" });
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

// Fulfill user's cart and create a new empty cart by cartId

router.post("/fulfill/:id", async (req, res, next) => {
  try {
    // fulfill old cart
    const fulfilledCart = await prisma.cart.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isFulfilled: true,
      },
      select: {
        id: true,
        userId: true,
        CartItem: {
          select: {
            productId: true,
          },
        },
      },
    });

    // const test = await prisma.product.findMany({
    //   where: {
    //     id: {
    //       in: fulfilledCart.CartItem.map((item) => item.productId),
    //     },
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     stockQty: true,
    //   },
    // });

    // Decrease stock qty of purchased items
    await prisma.product.updateMany({
      where: {
        id: {
          in: fulfilledCart.CartItem.map((item) => item.productId),
        },
      },
      data: {
        stockQty: {
          decrement: 1,
        },
      },
    });

    // create a new empty cart
    const newCart = await prisma.cart.create({
      data: {
        userId: fulfilledCart.userId,
      },
    });

    res.status(200).json(newCart);
  } catch (error) {
    next(error);
  }
});

// Decrease product stock after successful guestCart checkout

router.put("/fulfill-guest", async (req, res) => {
  const { CartItem } = req.body;

  const updatedQty = await prisma.product.updateMany({
    where: {
      id: {
        in: CartItem.map((item) => item.product.id),
      },
    },
    data: {
      stockQty: {
        decrement: 1,
      },
    },
  });

  res.status(200).json(updatedQty);
});

module.exports = router;
