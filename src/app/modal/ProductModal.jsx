"use client";
import React, { useState, useContext, useEffect } from "react";
// style
import style from "./style.module.css";
// Contenxt
import { GlobalContext } from "../context/GlobalContext";
// Swalt
import Swal from "sweetalert2";
// Icons
import { IconX } from "@tabler/icons-react";
// Animation
import { motion, AnimatePresence } from "framer-motion";
// Font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ProductModal({ setShow, isEdit, productToEdit }) {
  // UseContext
  const { addProduct, updateProduct, products } = useContext(GlobalContext); // Importa 'products'
  // validations
  const [errors, setErrors] = useState({});
  // FormValues
  const [newProduct, setNewProduct] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && productToEdit) {
      setNewProduct({ ...productToEdit });
    } else {
      setNewProduct({ codigo: "", nombre: "", descripcion: "", cantidad: "" });
    }
  }, [isEdit, productToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Validacion
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!newProduct.nombre.trim()) {
      tempErrors.nombre = "El nombre es requerido.";
      isValid = false;
    }

    if (!newProduct.codigo.trim()) {
      tempErrors.codigo = "El código es requerido.";
      isValid = false;
    } else if (
      !isEdit && // Solo validar al crear un nuevo producto
      products.some((product) => product.codigo === newProduct.codigo)
    ) {
      tempErrors.codigo = "Ya existe un producto con este código.";
      isValid = false;
    }

    if (!newProduct.cantidad.trim()) {
      tempErrors.cantidad = "La cantidad es querida.";
      isValid = false;
    } else if (isNaN(Number(newProduct.cantidad)) || Number(newProduct.cantidad) <= 0) {
      tempErrors.cantidad = "La cantidad debe ser un número mayor que 0.";
      isValid = false;
    }

    if (!newProduct.descripcion.trim()) {
      tempErrors.descripcion = "La descripción es requerida.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (isEdit && productToEdit) {
        updateProduct(productToEdit.codigo, newProduct);
        Swal.fire("Éxito", "Producto actualizado con éxito", "success");
      } else {
        addProduct(newProduct);
        Swal.fire("Éxito", "Producto creado con éxito", "success");
      }
      setNewProduct({ codigo: "", nombre: "", cantidad: "", descripcion: "" });
      setLoading(false);
      setShow(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${style.container_main_modal}`}
        >
          <div className={`bg-white rounded-lg shadow-lg ${style.modal_size}`}>
            <div className="grid grid-cols-12 flex justify-between">
              <div className="col-span-10">
                <p
                  className={`text-center ${style.title_modal} ${poppins.className}`}
                >
                  {isEdit ? "Editar Producto" : "Datos del Producto"}
                </p>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <div
                  className={style.container_icon}
                  onClick={() => setShow(false)}
                >
                  <IconX stroke={2} className={style.icon_closed_size} />
                </div>
              </div>
            </div>

            <form className="p-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 md:col-span-6">
                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${style.label_css} ${poppins.className}`}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={newProduct.nombre}
                      onChange={handleInputChange}
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nombre}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-4 md:col-span-3">
                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${style.label_css} ${poppins.className}`}
                    >
                      Código
                    </label>
                    <input
                      type="number"
                      name="codigo"
                      value={newProduct.codigo}
                      onChange={handleInputChange}
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.codigo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.codigo}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-4 md:col-span-3">
                  <div>
                    <label
                      className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${style.label_css} ${poppins.className}`}
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      value={newProduct.cantidad}
                      onChange={handleInputChange}
                      id="small-input"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.cantidad && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cantidad}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-8 md:col-span-6">
                  <label
                    className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${style.label_css} ${poppins.className}`}
                  >
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={newProduct.descripcion}
                    onChange={handleInputChange}
                    id="message"
                    style={{
                      resize: "none",
                    }}
                    rows="2"
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Descripción del producto..."
                  ></textarea>
                  {errors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.descripcion}
                    </p>
                  )}
                </div>
              </div>

              <div className="gap-4 mt-5 flex justify-end">
                <button
                  type="button"
                  className={`${style.cancel_button} ${poppins.className}`}
                  onClick={() => setShow(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`${style.add_button} ${poppins.className}`}
                >
                  {loading ? (
                    <div
                      role="status"
                      className="flex justify-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className={`text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ${style.spinner_css}`}
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="ml-2">
                        {isEdit ? "Actualizando..." : "Creando..."}
                      </span>
                    </div>
                  ) : isEdit ? (
                    "Guardar Cambios"
                  ) : (
                    "Agregar Producto"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}