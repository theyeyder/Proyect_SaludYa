import "./home.css";

const modulosPorRol = {

  /* ADMINISTRADOR */
  Administrador: [
    "configuracion",
    "admision",
    "citas",
    "historia",
    "facturacion",
    "documentos",
  ],

  /* ADMISION */
  "Admisión": [
    "admision",
    "citas",
    "documentos",
  ],

  /* MEDICO */
  "Médico": [
    "historia",
  ],

  /* FACTURACION */
  Facturación: [
    "admision",
    "historia",
    "facturacion",
    "documentos",
  ],

  Facturador: [
    "admision",
    "historia",
    "facturacion",
    "documentos",
  ],

};

const modulos = {

  configuracion: {
  titulo: "Configuración",
  ruta: "/configuracion",
  img: "/img/icon/configuracion.png",
},

admision: {
  titulo: "Admisión",
  ruta: "/admision",
  img: "/img/icon/admisiones.png",
},

citas: {
  titulo: "Citas",
  ruta: "/citas",
  img: "/img/icon/citas.png",
},

historia: {
  titulo: "Historia Clínica",
  ruta: "/historia-clinica",
  img: "/img/icon/historiaclinica.png",
},

facturacion: {
  titulo: "Facturación",
  ruta: "/facturacion",
  img: "/img/icon/facturacion.png",
},

documentos: {
  titulo: "Consulta Documentos",
  ruta: "/consulta-documentos",
  img: "/img/icon/documentos.png",
},

};

export default function Home() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  const rol = usuario?.nivelAcceso || "";

  const modulosPermitidos =
    modulosPorRol[rol] || [];

  return (

    <div className="home">

      <div className="grid">

        {modulosPermitidos.map((key) => {

          const modulo = modulos[key];

          return (

            <a
              key={key}
              href={modulo.ruta}
              className="card-modulo"
            >

              <img
                src={modulo.img}
                alt={modulo.titulo}
              />

              <h3>
                {modulo.titulo}
              </h3>

            </a>

          );

        })}

      </div>

    </div>

  );

}