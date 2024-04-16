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
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  return (
    <div id="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premade" element={<PreMade />} />
        <Route path="/premade/:id" element={<SingleProduct />} />
        <Route path="/custom" element={<RequestCustom />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
