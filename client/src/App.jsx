import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import PreMade from "./pages/PreMade/PreMade";
import RequestCustom from "./pages/RequestCustom/RequestCustom";
import { allProductsThunk } from "./store/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.allProducts);
  console.log(products);
  useEffect(() => {
    dispatch(allProductsThunk());
  }, []);
  return (
    <div id="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premade" element={<PreMade />} />
        <Route path="/custom" element={<RequestCustom />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
