"use client";
import React, { createContext, useState, useEffect, useRef } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    const loadStoredProducts = () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      setLoading(false);
    };

    setTimeout(() => {
      loadStoredProducts();
      initialLoad.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    if (!initialLoad.current) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts([
      ...products,
      { ...newProduct, fechaCreacion: new Date().toISOString() },
    ]);
  };

  const updateProduct = (codigoToUpdate, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.codigo === codigoToUpdate
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  const deleteProduct = (indexToDelete) => {
    setProducts(products.filter((_, index) => index !== indexToDelete));
  };

  return (
    <GlobalContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct, loading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
