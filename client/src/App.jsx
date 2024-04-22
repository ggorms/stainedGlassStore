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
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(me());
  }, [loggedInUser.userId]);

  useEffect(() => {
    if (loggedInUser.userId) {
      dispatch(getCartThunk(loggedInUser.userId));
    }
  }, [loggedInUser.userId]);

  return (
    <div id="app">
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
        <>
          <Nav
            loggedInUser={loggedInUser}
            mobileMenuToggle={mobileMenuToggle}
            setMobileMenuToggle={setMobileMenuToggle}
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
                <Route path="/cart" element={<Cart cart={cart} />} />
                <Route path="*" element={<Navigate to={"/"} replace />} />
              </Routes>
            </div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
