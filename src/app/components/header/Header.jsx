import React from "react";
// style
import style from "./style.module.css";
// Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header({ title, subtitle }) {
  return (
    <>
      <p className={`${style.title} ${poppins.className}`}>{title}</p>
      <p className={`${style.subtitle} ${poppins.className}`}>{subtitle}</p>

      <div className="flex justify-center items-center">
        <hr className={`mt-4 ${style.divider_section}`}></hr>
      </div>
    </>
  );
}
