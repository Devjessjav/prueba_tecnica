"use client";
import React, { useState } from "react";
// Animation
import { motion, AnimatePresence } from "framer-motion";
// Styles
import style from "./style.module.css";
// RouterLinks
import LinksRouter from "./LinksRouter";
// Icons
import {
  IconEdit,
  IconLayoutDashboard,
  IconMenuDeep,
} from "@tabler/icons-react";
// Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <IconMenuDeep stroke={1} className={`w-7 h-7`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen ${style.main_sidebar}`}
            aria-label="Barra lateral"
          >
            <div
              className={`flex justify-end mb-4 md:hidden absolute ${style.button_logeout_mobile}`}
            >
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-800 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <IconMenuDeep stroke={1} className="w-7 h-7" />
              </button>
            </div>
            <div className={`${style.container_nav}`}>
              <h2 className={style.logotipo}>LOGOTIPO</h2>
            </div>

            <div
              className={`h-full py-1 md:py-4 overflow-y-auto ${style.container_sidebar}`}
            >
              <div className={style.container_info_admin}>
                <div className="grid grid-cols-12">
                  <div className="col-span-11">
                    <p
                      className={`text-center ${style.name_admin} ${poppins.className}`}
                    >
                      Nombre Apellido
                    </p>
                    <p
                      className={`text-center ${style.rol_name} ${poppins.className}`}
                    >
                      Administrador
                    </p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <IconEdit stroke={1} />
                  </div>
                </div>
              </div>
              <div className={style.divider_container}>
                <hr className={style.hr_line}></hr>

                <div className={`ml-2 mr-2 ${style.container_icon}`}>
                  <IconLayoutDashboard stroke={1} />
                </div>

                <hr className={style.hr_line}></hr>
              </div>

              <LinksRouter />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
