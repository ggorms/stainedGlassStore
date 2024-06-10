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
// import Checkout from "./pages/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUser = useSelector((state) => state.auth.user);

  const cart =
    useSelector((state) => state.cart.cart) ??
    JSON.parse(window.sessionStorage.getItem("guestCart"));
  console.log("cart", cart);

  useEffect(() => {
    dispatch(me());
    setLoading(false);
    loadCart();
  }, [loggedInUser?.userId, dispatch]);

  const loadCart = () => {
    if (loggedInUser?.userId) {
      dispatch(getCartThunk(loggedInUser.userId));
    } else {
      window.sessionStorage.setItem(
        "guestCart",
        JSON.stringify({
          CartItem: [],
        })
      );
    }
  };

  // useEffect(() => {
  //   // dispatch(me());
  //   if (!loading.user) {
  //     if (loggedInUser?.userId) {
  //       // setLoading(true);
  //       dispatch(getCartThunk(loggedInUser.userId));
  //       setLoading({ ...loading, cart: false });
  //     } else {
  //       window.sessionStorage.setItem(
  //         "guestCart",
  //         JSON.stringify({
  //           CartItem: ["hi"],
  //         })
  //       );
  //       setLoading({ ...loading, cart: false });
  //     }
  //   }
  // }, [dispatch, loggedInUser?.userId]);

  console.log("user", loggedInUser);
  // const guestCart = window.sessionStorage.getItem("guestCart") ?? null;
  // console.log(guestCart.CartItem);
  // useEffect(() => {
  //   if (loggedInUser.userId) {
  //     // setLoading(true);
  //     dispatch(getCartThunk(loggedInUser.userId));
  //     setLoading(false);
  //   }
  // }, [loggedInUser.userId]);
  // console.log(loading);
  console.log("loading", loading);

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
                    <Route path="/premade/:id" element={<SingleProduct />} />
                    <Route path="/custom" element={<RequestCustom />} />
                    <Route path="/cart" element={<Cart cart={cart} />} />
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
                      element={<SingleProduct cartId={cart?.id} />}
                    />
                    <Route path="/custom" element={<RequestCustom />} />
                    <Route
                      path="/cart"
                      element={<Cart cart={cart} user={loggedInUser} />}
                    />
                    {/* <Route path="/checkout" element={<Checkout />} /> */}
                    {/* <Route
                      path="/checkout"
                      element={<Checkout cart={cart} />}
                    /> */}
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
