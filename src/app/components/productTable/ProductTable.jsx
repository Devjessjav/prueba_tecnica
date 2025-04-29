"use client";
import React, { useState, useContext, useEffect, useMemo } from "react";
// style
import style from "./style.module.css";
// Alert
import Swal from "sweetalert2";
// Icons
import {
  IconEdit,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react";
// Components
import Pagination from "../pagination/Pagination";
import ProductModal from "@/app/modal/ProductModal";
// Contenxt
import { GlobalContext } from "@/app/context/GlobalContext";
import InputSearch from "../forms/InputSearch/InputSearch";


const SortIcon = ({ sortOrder, field }) => {
  const isAsc = sortOrder?.field === field && sortOrder?.direction === "asc";
  const isDesc = sortOrder?.field === field && sortOrder?.direction === "desc";

  return (
    <>
      <IconArrowUp
        size={16}
        className={`inline-block ml-1 ${
          isAsc ? "" : "opacity-50 hover:opacity-100"
        }`}
      />
      <IconArrowDown
        size={16}
        className={`inline-block ml-1 ${
          isDesc ? "" : "opacity-50 hover:opacity-100"
        }`}
      />
    </>
  );
};

export default function ProductTable({ products }) {
  // UseContext
  const { deleteProduct } = useContext(GlobalContext);
  // Data
  const [currentData, setCurrentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({
    field: "codigo",
    direction: "asc",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleDelete = async (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          deleteProduct(index);
          Swal.fire("Éxito", "Producto Eliminado con éxito", "success");
        } catch (error) {
          console.error("Error al eliminar producto:", error);
        }
      }
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    setSortOrder((prevOrder) => ({
      field,
      direction:
        prevOrder?.field === field && prevOrder?.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {
    let dataToFilter = products;
    if (searchTerm) {
      dataToFilter = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(dataToFilter);
  }, [searchTerm, products]);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [
      ...(filteredData.length > 0 ? filteredData : products),
    ];

    if (sortOrder) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortOrder.field];
        const bValue = b[sortOrder.field];

        let comparison = 0;
        if (typeof aValue === "string" && typeof bValue === "string") {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else if (sortOrder.field === "fechaCreacion") {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          comparison = dateA.getTime() - dateB.getTime();
        }

        return sortOrder.direction === "asc" ? comparison : comparison * -1;
      });
    }

    return sortableProducts;
  }, [filteredData, products, sortOrder]);

  return (
    <>
      <div
        className={`${style.container_table_data} px-2 py-4 flex flex-col  shadow-md`}
      >
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <div className="grid grid-cols-12 mb-3 items-center">
            <div className="col-span-12 md:col-span-2">
              <InputSearch
                onSearch={handleSearch}
                placeholder="Buscar por nombre"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-3 text-center ${style.border_id} cursor-pointer whitespace-nowrap`}
                  onClick={() => handleSort("codigo")}
                >
                  Código
                  <SortIcon sortOrder={sortOrder} field="codigo" />
                </th>
                <th
                  scope="col"
                  className={` px-6 py-3 ${style.border_right} cursor-pointer whitespace-nowrap`}
                  onClick={() => handleSort("nombre")}
                >
                  Nombre del Producto
                  <SortIcon sortOrder={sortOrder} field="nombre" />
                </th>
                <th
                  scope="col"
                  className={` px-6 py-3 ${style.border_right} text-left whitespace-nowrap`}
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className={` px-6 py-3 ${style.border_right} text-center cursor-pointer whitespace-nowrap`}
                  onClick={() => handleSort("cantidad")}
                >
                  Cantidad
                  <SortIcon sortOrder={sortOrder} field="cantidad" />
                </th>
                <th
                  scope="col"
                  className={` px-6 py-3 ${style.border_right} text-center cursor-pointer whitespace-nowrap`}
                  onClick={() => handleSort("fechaCreacion")}
                >
                  Fecha de Creación
                  <SortIcon sortOrder={sortOrder} field="fechaCreacion" />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap"
                >
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.codigo}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                  <td className="px-6 py-4 text-left">
                    <p className={`truncate ${style.w_text_descripction}`}>
                      {item.descripcion}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {item.cantidad}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {new Date(item.fechaCreacion).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    <button
                      className={`mr-2 ${style.button_options}`}
                      onClick={() => openEditModal(item)}
                    >
                      <IconEdit stroke={1} />
                    </button>
                    <button
                      className={style.button_options}
                      onClick={() => handleDelete(index)}
                    >
                      <IconTrash stroke={1} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={style.container_pagination}>
          <Pagination
            dataSource={sortedProducts}
            setCurrentData={setCurrentData}
            pagesShow={5}
            itemsShow={8}
          />
        </div>

        {isEditModalOpen && productToEdit && (
          <ProductModal
            setShow={closeEditModal}
            isEdit={true}
            productToEdit={productToEdit}
          />
        )}
      </div>
    </>
  );
}
