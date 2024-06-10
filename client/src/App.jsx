import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import PreMade from "./pages/PreMade/PreMade";
import RequestCustom from "./pages/RequestCustom/RequestCustom";
import Account from "./pages/Account/Account";
import { me } from "./store/auth";
import { getCartThunk } from "./store/cart";
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

  console.log("cart", cart);

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
        }
      }
    };
    loadCart();
  }, [loggedInUser?.userId, dispatch]);

  return (
    <div id="app">
      {!loading && (
        <>
          {/* Guest Routes */}
          {!loggedInUser ? (
            <>
              <Nav
                // loggedInUser={loggedInUser}
                mobileMenuToggle={mobileMenuToggle}
                setMobileMenuToggle={setMobileMenuToggle}
                cart={cart}
              />
              {!mobileMenuToggle && (
                <div className="content">
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
                </div>
              )}
              <Footer />
            </>
          ) : (
            // User Routes
            <>
              <Nav
                loggedInUser={loggedInUser}
                mobileMenuToggle={mobileMenuToggle}
                setMobileMenuToggle={setMobileMenuToggle}
                cart={cart}
              />
              {!mobileMenuToggle && (
                <div className="content">
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
                </div>
              )}
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
