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
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  useEffect(() => {
    dispatch(me());
    if (loggedInUser.userId) {
      // setLoading(true);
      dispatch(getCartThunk(loggedInUser.userId));
      setLoading(false);
    }
  }, [loggedInUser.userId]);

  // useEffect(() => {
  //   if (loggedInUser.userId) {
  //     // setLoading(true);
  //     dispatch(getCartThunk(loggedInUser.userId));
  //     setLoading(false);
  //   }
  // }, [loggedInUser.userId]);
  console.log(loading);
  return (
    <div id="app">
      {!loading && (
        <>
          {/* Guest Routes */}
          {!loggedInUser.userId ? (
            <>
              <Nav loggedInUser={loggedInUser} />
              {!mobileMenuToggle && (
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/premade" element={<PreMade />} />
                    <Route path="/premade/:id" element={<SingleProduct />} />
                    <Route path="/custom" element={<RequestCustom />} />
                    <Route path="/cart" element={<Cart />} />
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
                      element={<SingleProduct cartId={cart.id} />}
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
