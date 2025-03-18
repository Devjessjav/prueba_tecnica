"use client";
import React, { useState } from "react";
// style
import style from "./style.module.css";
// components
import ButtonAdd from "../forms/ButtonAdd/ButtonAdd";
// Modal
import ProductModal from "@/app/modal/ProductModal";
// Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function NoData() {
  // Show Modal
  const [show, setShow] = useState(false);

  return (
    <div className={style.container_no_data}>
      <div className={style.no_data_info_container}>
        <p className={`mb-4 ${style.text_no_data} ${poppins.className}`}>
          No hay productos Registrados
        </p>
        <div className="flex justify-center">
          <ButtonAdd text="Agregar Producto" setShow={setShow} />
        </div>
      </div>
      {show && <ProductModal setShow={setShow} />}
    </div>
  );
}
