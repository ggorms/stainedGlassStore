const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const addresses = require("./address");
const users = require("./users");
const products = require("./products");
const cartItems = require("./cartItems");
const carts = require("./carts");

const main = async () => {
  salt_rounds = 5;
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, salt_rounds);
      return prisma.user.create({
        data: {
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          password: hashedPassword,
        },
      });
    })
  );
  await Promise.all(
    products.map(async (product) => {
      return prisma.product.create({
        data: {
          name: product.name,
          imageId: product.imageId,
          price: product.price,
          inStock: product.inStock,
        },
      });
    })
  );
  await Promise.all(
    addresses.map(async (address) => {
      return prisma.address.create({
        data: {
          userId: address.userId,
          unit: address.unit,
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
        },
      });
    })
  );
  await Promise.all(
    carts.map(async (cart) => {
      return prisma.cart.create({
        data: {
          userId: cart.userId,
          isFulfilled: cart.isFulfilled,
        },
      });
    })
  );
  await Promise.all(
    cartItems.map(async (cartItem) => {
      return prisma.cartItem.create({
        data: {
          cartId: cartItem.cartId,
          productId: cartItem.productId,
          qty: cartItem.qty,
        },
      });
    })
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
