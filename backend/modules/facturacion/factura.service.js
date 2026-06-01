const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const Factura = require("./factura.model");
const Documento = require("../documentos/documento.model");

function generarNumeroFactura(totalFacturas) {
  const consecutivo = totalFacturas + 1;
  return `FAC-${String(consecutivo).padStart(6, "0")}`;
}

function formatoMoneda(valor) {
  return `$${Number(valor || 0).toLocaleString("es-CO")}`;
}

function generarPDF(factura) {
  console.log("🔥 GENERANDO PDF NUEVO SALUDYA:", factura.numeroFactura);

  const uploadsDir = path.join(process.cwd(), "uploads", "facturas");
  const logoPath = path.join(
    process.cwd(),
    "uploads",
    "logo",
    "LogoSaludYa.png"
  );

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileName = `${factura.numeroFactura}.pdf`;
  const filePath = path.join(uploadsDir, fileName);

  console.log("📄 PDF SE GUARDARÁ EN:", filePath);

  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  doc.pipe(fs.createWriteStream(filePath));

  const pageWidth = doc.page.width;
  const left = 40;
  const right = pageWidth - 40;

  doc.rect(0, 0, pageWidth, 115).fill("#0f6b7c");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 45, 24, { width: 72 });
  }

  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text("SALUDYA IPS", 130, 28);

  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Sistema de Gestión Clínica", 130, 55);

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("FACTURA DE VENTA", 365, 28, {
      width: 170,
      align: "right",
    });

  doc.fontSize(13).text(factura.numeroFactura, 365, 55, {
    width: 170,
    align: "right",
  });

  doc.font("Helvetica").fontSize(10).text(
    `Fecha: ${factura.fechaEmision || ""}`,
    365,
    76,
    {
      width: 170,
      align: "right",
    }
  );

  let y = 145;

  doc
    .roundedRect(left, y, right - left, 92, 10)
    .fillAndStroke("#f8fafc", "#dbe3ea");

  doc
    .fillColor("#f7f7f7")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("DATOS DEL PACIENTE", left + 15, y + 13);

  doc
    .fillColor("#1e293b")
    .font("Helvetica")
    .fontSize(10)
    .text(`Paciente: ${factura.datosPaciente?.nombres || ""}`, left + 15, y + 35)
    .text(
      `Documento: ${factura.datosPaciente?.tipoDocumento || ""} ${
        factura.datosPaciente?.numeroDocumento || ""
      }`,
      left + 15,
      y + 53
    )
    .text(
      `Fecha nacimiento: ${
        factura.datosPaciente?.fechaNacimiento || "No registrada"
      }`,
      left + 15,
      y + 71
    )
    .text(
      `Médico: ${factura.datosMedico?.nombreMedico || ""}`,
      310,
      y + 35,
      { width: 230 }
    )
    .text(`Estado: ${factura.estadoPago || "Pendiente"}`, 310, y + 53);

  y += 125;

  doc
    .fillColor("#0f6b7c")
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Detalle de factura", left, y);

  y += 25;

  const tableX = left;
  const col = {
    codigo: tableX,
    descripcion: tableX + 70,
    cantidad: tableX + 305,
    unitario: tableX + 350,
    total: tableX + 445,
  };

  const rowHeight = 24;

  function dibujarEncabezadoTabla() {
    doc.rect(tableX, y, right - left, rowHeight).fill("#0f6b7c");

    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Código", col.codigo + 6, y + 8, { width: 60 })
      .text("Descripción", col.descripcion + 6, y + 8, { width: 220 })
      .text("Cant.", col.cantidad + 6, y + 8, { width: 40 })
      .text("V. Unitario", col.unitario + 6, y + 8, { width: 85 })
      .text("Total", col.total + 6, y + 8, { width: 80 });

    y += rowHeight;
  }

  dibujarEncabezadoTabla();

  factura.detalle.forEach((item, index) => {
    if (y > 690) {
      doc.addPage();
      y = 45;
      dibujarEncabezadoTabla();
    }

    const descripcion = item.descripcion || "-";
    const estimatedLines = Math.ceil(descripcion.length / 44);
    const dynamicHeight = Math.max(30, estimatedLines * 13 + 12);

    doc
      .rect(tableX, y, right - left, dynamicHeight)
      .fill(index % 2 === 0 ? "#ffffff" : "#f8fafc");

    doc
      .fillColor("#1e293b")
      .font("Helvetica")
      .fontSize(8.5)
      .text(item.codigo || "-", col.codigo + 6, y + 8, { width: 60 })
      .text(descripcion, col.descripcion + 6, y + 8, { width: 220 })
      .text(String(item.cantidad || 1), col.cantidad + 8, y + 8, { width: 35 })
      .text(formatoMoneda(item.valorUnitario), col.unitario + 6, y + 8, {
        width: 85,
      })
      .text(formatoMoneda(item.total), col.total + 6, y + 8, { width: 80 });

    y += dynamicHeight;
  });

  y += 22;

  if (y > 690) {
    doc.addPage();
    y = 60;
  }

  doc.roundedRect(335, y, 220, 86, 10).fillAndStroke("#ecfdf5", "#bbf7d0");

  doc
    .fillColor("#065f46")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Subtotal", 355, y + 18);

  doc.font("Helvetica").fontSize(11).text(
    formatoMoneda(factura.subtotal),
    435,
    y + 18,
    {
      width: 100,
      align: "right",
    }
  );

  doc.font("Helvetica-Bold").fontSize(15).text("TOTAL", 355, y + 48);

  doc.fontSize(15).text(formatoMoneda(factura.total), 415, y + 48, {
    width: 120,
    align: "right",
  });

  doc
    .fillColor("#64748b")
    .font("Helvetica")
    .fontSize(9)
    .text("Factura generada automáticamente por SaludYa IPS.", 40, 760, {
      width: 515,
      align: "center",
    });

  doc.end();

  return `/uploads/facturas/${fileName}`;
}

async function crear(data) {
  const totalFacturas = await Factura.countDocuments();
  const numeroFactura = generarNumeroFactura(totalFacturas);

  const detalle = Array.isArray(data.detalle)
    ? data.detalle.map((item) => {
        const cantidad = Number(item.cantidad || 1);
        const valorUnitario = Number(item.valorUnitario || 0);

        return {
          tipo: item.tipo || "",
          codigo: item.codigo || "",
          descripcion: item.descripcion || "",
          cantidad,
          valorUnitario,
          total: cantidad * valorUnitario,
        };
      })
    : [];

  const subtotal = detalle.reduce(
    (acc, item) => acc + Number(item.total || 0),
    0
  );

  const factura = await Factura.create({
    ...data,
    numeroFactura,
    detalle,
    subtotal,
    total: data.total || subtotal,
    estadoPago: data.estadoPago || "Pendiente",
    fechaEmision: data.fechaEmision || new Date().toISOString().slice(0, 10),
  });

  const archivoUrl = generarPDF(factura);

  await Documento.create({
    pacienteId: factura.pacienteId,
    tipoDocumento: factura.datosPaciente?.tipoDocumento || "",
    numeroDocumento: factura.datosPaciente?.numeroDocumento || "",
    titulo: `Factura ${factura.numeroFactura}`,
    descripcion: "Factura de venta generada por SaludYa",
    archivoUrl,
    fecha: factura.fechaEmision,
  });

  return factura;
}

async function listar() {
  return await Factura.find().sort({ createdAt: -1 });
}

async function obtenerPorId(id) {
  const factura = await Factura.findById(id);

  if (!factura) {
    throw new Error("Factura no encontrada");
  }

  return factura;
}

async function listarPorPaciente(pacienteId) {
  return await Factura.find({ pacienteId }).sort({ createdAt: -1 });
}

async function cambiarEstado(id, estadoPago) {
  const factura = await Factura.findByIdAndUpdate(
    id,
    { estadoPago },
    { new: true }
  );

  if (!factura) {
    throw new Error("Factura no encontrada");
  }

  return factura;
}

module.exports = {
  crear,
  listar,
  obtenerPorId,
  listarPorPaciente,
  cambiarEstado,
};