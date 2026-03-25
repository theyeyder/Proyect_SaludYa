# SaludYa - Proyecto Completo Base

Proyecto base para SaludYa con:
- Backend: Node.js + Express + MongoDB
- Frontend: React + React Router
- Inicio de sesión con **username y password** para usuarios internos
- Título automático según nivel de acceso y sexo
- Pacientes sin login; consultan documentos por identificación

## Niveles de acceso internos
- Administrador -> Admin.
- Admisión -> Lic.
- Médico -> Dr. / Dra.
- Facturación -> Lic.

## Portal externo para pacientes
Los pacientes **no necesitan usuario ni contraseña**.
La consulta de documentos médicos se realiza desde un portal externo usando:
- tipo de identificación
- número de identificación

## Módulos internos
- Configuración
- Admisión
- Citas
- Historia Clínica
- Órdenes Médicas
- Facturación
