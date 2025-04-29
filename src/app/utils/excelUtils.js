import * as XLSX from "xlsx";

const generateExcelData = (data) => {
  return data.map((item) => ({
    Código: item.codigo,
    "Nombre del Producto": item.nombre,
    Descripción: item.descripcion,
    Cantidad: item.cantidad,
    "Fecha de Creación": new Date(item.fechaCreacion).toLocaleDateString(),
  }));
};

const downloadExcel = (data) => {
  const excelData = generateExcelData(data);
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
  XLSX.writeFile(workbook, "productos.xlsx");
};

export { downloadExcel };
