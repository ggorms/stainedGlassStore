import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import PreMade from "./pages/PreMade/PreMade";
import RequestCustom from "./pages/RequestCustom/RequestCustom";
import Account from "./pages/Account/Account";
import { me } from "./store/auth";
import { getCartThunk, addToCartThunk } from "./store/cart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";

function App() {
  const dispatch = useDispatch();
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestCart, setGuestCart] = useState(
    JSON.parse(window.sessionStorage.getItem("guestCart"))
  );

  const loggedInUser = useSelector((state) => state.auth.user);

  // console.log("test", guestCart);
  const cart = useSelector((state) => state.cart.cart) ?? guestCart;

  // Handle loading cart for User or Guest
  useEffect(() => {
    dispatch(me());
    setLoading(false);
    const loadCart = () => {
      if (loggedInUser?.userId) {
        dispatch(getCartThunk(loggedInUser.userId));
      } else {
        const guestCartActive = JSON.parse(
          window.sessionStorage.getItem("guestCart")
        );
        if (!guestCartActive) {
          window.sessionStorage.setItem(
            "guestCart",
            JSON.stringify({
              CartItem: [],
            })
          );
          setGuestCart(JSON.parse(window.sessionStorage.getItem("guestCart")));
        }
      }
    };
    loadCart();
  }, [loggedInUser?.userId, dispatch]);

  // Handle transfer of guest cart to user cart
  useEffect(() => {
    if (cart?.id && guestCart?.CartItem.length > 0) {
      const cartItemInfo = {
        cartId: cart.id,
        CartItems: guestCart?.CartItem.map((item) => ({
          qty: item.qty,
          product: {
            id: item.product.id,
          },
        })),
      };
      dispatch(addToCartThunk(cartItemInfo));

      window.sessionStorage.removeItem("guestCart");
    }
  }, [cart?.id]);

  return (
    <div id="app">
      {!loading && (
        <>
          {/* Guest Routes */}
          {!loggedInUser ? (
            <div className={mobileMenuToggle ? "contentMenuActive" : "content"}>
              {mobileMenuToggle && <span className="blur"></span>}
              <Nav
                // loggedInUser={loggedInUser}
                mobileMenuToggle={mobileMenuToggle}
                setMobileMenuToggle={setMobileMenuToggle}
                cart={cart}
              />
              <>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/premade" element={<PreMade />} />
                  <Route
                    path="/premade/:id"
                    element={
                      <SingleProduct
                        cart={cart}
                        setGuestCart={setGuestCart}
                        guestCart={guestCart}
                      />
                    }
                  />
                  <Route path="/custom" element={<RequestCustom />} />
                  <Route
                    path="/cart"
                    element={
                      <Cart
                        cart={cart}
                        setGuestCart={setGuestCart}
                        guestCart={guestCart}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate to={"/"} replace />} />
                </Routes>
              </>
              <Footer />
            </div>
          ) : (
            // User Routes

            <div className={mobileMenuToggle ? "contentMenuActive" : "content"}>
              {mobileMenuToggle && <span className="blur"></span>}
              <Nav
                loggedInUser={loggedInUser}
                mobileMenuToggle={mobileMenuToggle}
                setMobileMenuToggle={setMobileMenuToggle}
                cart={cart}
              />

              <>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/premade" element={<PreMade />} />
                  <Route
                    path="/premade/:id"
                    element={<SingleProduct userCartId={cart?.id} />}
                  />
                  <Route path="/custom" element={<RequestCustom />} />
                  <Route
                    path="/cart"
                    element={<Cart cart={cart} user={loggedInUser} />}
                  />
                  <Route path="*" element={<Navigate to={"/"} replace />} />
                </Routes>
              </>

              <Footer />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
