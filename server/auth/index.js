const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = require("./verify");

// Register
router.post("/register", async (req, res, next) => {
  const SALT_ROUNDS = 5;
  try {
    const { email, password, fName, lName } = req.body;

    // Check if email provided is already associated with an existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(401).json({ message: "Email is already in use" });
      return;
    }

    // Encrpyt password from request body
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        fName: fName[0].toUpperCase() + fName.slice(1).toLowerCase(),
        lName: lName[0].toUpperCase() + lName.slice(1).toLowerCase(),
        Cart: {
          create: [{}],
        },
      },
    });

    const token = jwt.sign(newUser.id, process.env.JWT);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if provided email corresponds to an existing user
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!foundUser) {
      res.status(401).json({ message: "Incorrect Email or Password" });
      return;
    }

    const { password: userPassword } = foundUser;

    // Compare password from request body with the password from the user with corresponding email
    const validPassword = await bcrypt.compare(password, userPassword);

    if (!validPassword) {
      res.status(401).json({ message: "Incorrect Email or Password" });
      return;
    }

    const token = jwt.sign(foundUser.id, process.env.JWT);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// Me
router.get("/me", verify, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +req.user,
      },
      select: {
        id: true,
        email: true,
        fName: true,
        lName: true,
      },
    });

    // Get the loggedin user's cart
    const cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
        isFulfilled: false,
      },
      select: {
        id: true,
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

    res.status(200).json({
      userId: user.id,
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
