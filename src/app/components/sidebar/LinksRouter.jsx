"use client";
import React, { useEffect } from "react";
// Router
import Link from "next/link";
import { usePathname } from "next/navigation";
// Icons
import { IconPackages } from "@tabler/icons-react";
// style
import style from "./style.module.css";
// Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LinksRouter() {
  const pathname = usePathname();

  const routerLinks = [
    {
      title: "Productos",
      pathName: "/productos",
      icon: <IconPackages stroke={1} />,
    }
  ];

  return (
    <ul className="pr-5 mt-4">
      {routerLinks.map((item, index) => (
        <li
          key={index}
          className={`mb-3 ${style.link_container} ${
            pathname === item.pathName ? style.active : ""
          }`}
        >
          <div className={`${style.container_icon}`}>{item.icon}</div>
          <Link
            href={item.pathName}
            className={`${poppins.className}
            ${
              pathname === item.pathName
                ? style.link_title_active
                : style.link_title
            }
          }`}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
