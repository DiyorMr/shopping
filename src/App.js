import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Card from "./pages/card/Card";
import Navbar from "./pages/navbar/Navbar";
import Header from "./pages/header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Context = createContext(null);

export default function App() {
  const [cardInfo, setCardInfo] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [categorieList, setCategorieList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeBtn, setActiveBtn] = useState("all");
  const [deleteCardID, setDeleteCardID] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setAllProduct(json))
      .finally(() => setLoader(false));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategorieList(["all", ...json]));
  }, []);

  useEffect(() => {
    setLoader(true);
    if (activeBtn === "all") {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setAllProduct(json))
        .finally(() => setLoader(false));
    } else {
      fetch(`https://fakestoreapi.com/products/category/${activeBtn}`)
        .then((res) => res.json())
        .then((json) => setAllProduct(json))
        .finally(() => setLoader(false));
    }
  }, [activeBtn]);

  useEffect(() => {
    deleteCardID !== null &&
      fetch(`https://fakestoreapi.com/products/${deleteCardID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => toast.success("Product deleted."));
  }, [deleteCardID]);
  return (
    <div className="container">
      <Context.Provider
        value={{
          cardInfo,
          allProduct,
          categorieList,
          loader,
          activeBtn,
          setActiveBtn,
          setDeleteCardID,
          setCardInfo,
          modal,
          setModal,
        }}
      >
        <ToastContainer />
        <Navbar />
        <Header />
        <Card />
      </Context.Provider>
    </div>
  );
}
