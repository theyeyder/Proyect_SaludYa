import { useState } from "react";

export default function ConsultaDocumentos() {
  const [resultados, setResultados] = useState([]);

  const buscar = () => {
    setResultados([
      { id: 1, titulo: "Fórmula médica", fecha: "2026-03-24" },
      { id: 2, titulo: "Orden de laboratorio", fecha: "2026-03-24" },
    ]);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Consulta de Documentos Médicos</h1>
      <p>Portal externo para pacientes.</p>

      <div style={{ display: "grid", gap: 10, maxWidth: 400, marginBottom: 20 }}>
        <input placeholder="Tipo de identificación" />
        <input placeholder="Número de identificación" />
        <button onClick={buscar}>Buscar documentos</button>
      </div>

      {resultados.map((item) => (
        <div
          key={item.id}
          style={{ background: "#fff", border: "1px solid #ddd", padding: 16, marginBottom: 10 }}
        >
          <strong>{item.titulo}</strong>
          <div>Fecha: {item.fecha}</div>
          <button style={{ marginTop: 8 }}>Descargar</button>
        </div>
      ))}
    </div>
  );
}
