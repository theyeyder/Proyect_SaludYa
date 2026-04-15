import "./home.css";

const modulosPorRol = {
  Administrador: [
    "configuracion",
    "admision",
    "citas",
    "historia",
    "facturacion",
    "documentos",
  ],
  "Admisión": ["citas", "facturacion"],
  "Médico": ["historia"],
  Facturación: ["facturacion", "citas"],
  Facturador: ["facturacion", "citas"],
};

const modulos = {
  configuracion: {
    titulo: "Configuración",
    ruta: "/configuracion",
    img: "/img/configuracion.png",
  },
  admision: {
    titulo: "Admisión",
    ruta: "/admision",
    img: "/img/admisiones.png",
  },
  citas: {
    titulo: "Citas",
    ruta: "/citas",
    img: "/img/citas.png",
  },
  historia: {
    titulo: "Historia Clínica",
    ruta: "/historia-clinica",
    img: "/img/historiaclinica.png",
  },
  facturacion: {
    titulo: "Facturación",
    ruta: "/facturacion",
    img: "/img/facturacion.png",
  },
  documentos: {
    titulo: "Consulta Documentos",
    ruta: "/consulta-documentos",
    img: "/img/documentos.png",
  },
};

export default function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const rol = usuario?.nivelAcceso || "";

  const modulosPermitidos = modulosPorRol[rol] || [];

  return (
    <div className="home">
      <div className="home-header">
        <h1>Módulos del sistema</h1>
        <p>Seleccione una opción para continuar</p>
      </div>
        
      <div className="grid">
        {modulosPermitidos.map((key) => {
          const modulo = modulos[key];
          return (
            <a key={key} href={modulo.ruta} className="card-modulo">
              <img src={modulo.img} alt={modulo.titulo} />
              <h3>{modulo.titulo}</h3>
            </a>
          );
        })}
      </div>
    </div>
  );
}