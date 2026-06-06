const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SaludYa",
      version: "1.0.0",
      description:
        "Documentación de la API REST del sistema SaludYa para gestión clínica y administrativa.",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local",
      },
      {
        url: "https://proyect-saludya-backend.onrender.com",
        description: "Servidor producción Render",
      },
    ],
    paths: {
      "/api/auth/login": {
        post: {
          summary: "Iniciar sesión",
          tags: ["Autenticación"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                      example: "admin",
                    },
                    password: {
                      type: "string",
                      example: "123456",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Inicio de sesión exitoso",
            },
            401: {
              description: "Credenciales incorrectas",
            },
          },
        },
      },

      "/api/pacientes": {
        get: {
          summary: "Listar pacientes",
          tags: ["Pacientes"],
          responses: {
            200: {
              description: "Lista de pacientes",
            },
          },
        },
        post: {
          summary: "Crear paciente",
          tags: ["Pacientes"],
          responses: {
            201: {
              description: "Paciente creado correctamente",
            },
          },
        },
      },

      "/api/pacientes/documento/{tipoIdentificacion}/{numeroIdentificacion}": {
        get: {
          summary: "Buscar paciente por documento",
          tags: ["Pacientes"],
          parameters: [
            {
              in: "path",
              name: "tipoIdentificacion",
              required: true,
              schema: { type: "string" },
              example: "CC",
            },
            {
              in: "path",
              name: "numeroIdentificacion",
              required: true,
              schema: { type: "string" },
              example: "123456789",
            },
          ],
          responses: {
            200: {
              description: "Paciente encontrado",
            },
            404: {
              description: "Paciente no encontrado",
            },
          },
        },
      },

      "/api/citas": {
        get: {
          summary: "Listar citas",
          tags: ["Citas"],
          responses: {
            200: {
              description: "Lista de citas",
            },
          },
        },
        post: {
          summary: "Crear cita médica",
          tags: ["Citas"],
          responses: {
            201: {
              description: "Cita creada correctamente",
            },
          },
        },
      },

      "/api/historias": {
        get: {
          summary: "Listar historias clínicas",
          tags: ["Historias Clínicas"],
          responses: {
            200: {
              description: "Lista de historias clínicas",
            },
          },
        },
        post: {
          summary: "Crear historia clínica",
          tags: ["Historias Clínicas"],
          responses: {
            201: {
              description: "Historia clínica creada correctamente",
            },
          },
        },
      },

      "/api/ordenes": {
        get: {
          summary: "Listar órdenes médicas",
          tags: ["Órdenes Médicas"],
          responses: {
            200: {
              description: "Lista de órdenes médicas",
            },
          },
        },
        post: {
          summary: "Crear orden médica",
          tags: ["Órdenes Médicas"],
          responses: {
            201: {
              description: "Orden médica creada correctamente",
            },
          },
        },
      },

      "/api/facturas": {
        get: {
          summary: "Listar facturas",
          tags: ["Facturación"],
          responses: {
            200: {
              description: "Lista de facturas",
            },
          },
        },
        post: {
          summary: "Crear factura",
          tags: ["Facturación"],
          responses: {
            201: {
              description: "Factura creada correctamente",
            },
          },
        },
      },

      "/api/documentos/{tipoDocumento}/{numeroDocumento}": {
        get: {
          summary: "Consultar documentos médicos por identificación",
          tags: ["Documentos Médicos"],
          parameters: [
            {
              in: "path",
              name: "tipoDocumento",
              required: true,
              schema: { type: "string" },
              example: "CC",
            },
            {
              in: "path",
              name: "numeroDocumento",
              required: true,
              schema: { type: "string" },
              example: "123456789",
            },
          ],
          responses: {
            200: {
              description: "Documentos encontrados",
            },
            404: {
              description: "No hay documentos para mostrar",
            },
          },
        },
      },

      "/api/usuarios": {
        get: {
          summary: "Listar usuarios",
          tags: ["Usuarios"],
          responses: {
            200: {
              description: "Lista de usuarios",
            },
          },
        },
        post: {
          summary: "Crear usuario",
          tags: ["Usuarios"],
          responses: {
            201: {
              description: "Usuario creado correctamente",
            },
          },
        },
      },

      "/api/procedimientos": {
        get: {
          summary: "Listar procedimientos",
          tags: ["Procedimientos"],
          responses: {
            200: {
              description: "Lista de procedimientos",
            },
          },
        },
        post: {
          summary: "Crear procedimiento",
          tags: ["Procedimientos"],
          responses: {
            201: {
              description: "Procedimiento creado correctamente",
            },
          },
        },
      },

      "/api/laboratorios": {
        get: {
          summary: "Listar laboratorios",
          tags: ["Laboratorios"],
          responses: {
            200: {
              description: "Lista de laboratorios",
            },
          },
        },
        post: {
          summary: "Crear laboratorio",
          tags: ["Laboratorios"],
          responses: {
            201: {
              description: "Laboratorio creado correctamente",
            },
          },
        },
      },

      "/api/medicamentos": {
        get: {
          summary: "Listar medicamentos",
          tags: ["Medicamentos"],
          responses: {
            200: {
              description: "Lista de medicamentos",
            },
          },
        },
        post: {
          summary: "Crear medicamento",
          tags: ["Medicamentos"],
          responses: {
            201: {
              description: "Medicamento creado correctamente",
            },
          },
        },
      },

      "/api/tipos-consulta": {
        get: {
          summary: "Listar tipos de consulta",
          tags: ["Tipos de Consulta"],
          responses: {
            200: {
              description: "Lista de tipos de consulta",
            },
          },
        },
        post: {
          summary: "Crear tipo de consulta",
          tags: ["Tipos de Consulta"],
          responses: {
            201: {
              description: "Tipo de consulta creado correctamente",
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;