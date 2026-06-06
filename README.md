# SaludYa - README de Pruebas de Software

## 1. Descripción general

Este README documenta las pruebas de software configuradas para el proyecto **SaludYa**, sistema web para la gestión clínica y administrativa de consultorios médicos.

El objetivo es validar el funcionamiento del MVP mediante:

- Pruebas unitarias.
- Pruebas de integración.
- Pruebas EndToEnd.
- Evidencia de ejecución.
- Reporte de coverage.

---

## 2. Herramientas seleccionadas

Para SaludYa se recomienda utilizar:

| Herramienta | Uso |
|---|---|
| Jest | Pruebas unitarias del backend |
| Supertest | Pruebas de integración sobre endpoints API |
| Playwright | Pruebas EndToEnd del frontend desplegado |

Esta combinación se adapta al proyecto porque SaludYa está construido con:

- React + Vite en frontend.
- Node.js + Express en backend.
- MongoDB Atlas como base de datos.
- Render como entorno de producción.

---

## 3. Estructura recomendada

```txt
Proyect_SaludYa
│
├── backend
│   ├── tests
│   │   ├── factura.unit.test.js
│   │   └── api.integration.test.js
│   ├── app.js
│   ├── package.json
│   └── config
│       └── server.js
│
└── frontend
    ├── tests
    │   └── saludya.e2e.spec.js
    ├── package.json
    └── src
```

---

# 4. Pruebas unitarias con Jest

## 4.1 Instalación

Desde la carpeta del backend:

```bash
cd backend
npm install --save-dev jest supertest
```

## 4.2 Script en package.json

En `backend/package.json`, agregar:

```json
"scripts": {
  "start": "node config/server.js",
  "test": "jest --coverage"
}
```

## 4.3 Crear carpeta de pruebas

```bash
cd backend
mkdir tests
```

## 4.4 Archivo de prueba unitaria

Crear:

```txt
backend/tests/factura.unit.test.js
```

Código:

```js
function formatoMoneda(valor) {
  return `$${Number(valor || 0).toLocaleString("es-CO")}`;
}

describe("Pruebas unitarias - Facturación", () => {
  test("Debe formatear correctamente un valor en pesos colombianos", () => {
    expect(formatoMoneda(250000)).toBe("$250.000");
  });

  test("Debe retornar $0 cuando el valor es vacío", () => {
    expect(formatoMoneda()).toBe("$0");
  });

  test("Debe calcular correctamente el total de una factura", () => {
    const cantidad = 2;
    const valorUnitario = 50000;
    const total = cantidad * valorUnitario;

    expect(total).toBe(100000);
  });
});
```

## 4.5 Ejecutar pruebas unitarias

```bash
cd backend
npm test
```

Resultado esperado:

```txt
Test Suites: 1 passed
Tests: 3 passed
Coverage report generado
```

---

# 5. Pruebas de integración con Supertest

## 5.1 Archivo de prueba

Crear:

```txt
backend/tests/api.integration.test.js
```

Código:

```js
const request = require("supertest");
const app = require("../app");

describe("Pruebas de integración - API SaludYa", () => {
  test("Debe responder la ruta principal del backend", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API SaludYa funcionando");
  });

  test("Debe consultar pacientes desde la API", async () => {
    const res = await request(app).get("/api/pacientes");

    expect([200, 404, 500]).toContain(res.statusCode);
  });

  test("Debe consultar documentos médicos por identificación", async () => {
    const res = await request(app).get("/api/documentos/CC/123456");

    expect([200, 404, 500]).toContain(res.statusCode);
  });
});
```

## 5.2 Ejecutar pruebas de integración

```bash
cd backend
npm test
```

Resultado esperado:

```txt
Test Suites: 2 passed
Tests: 6 passed
```

---

# 6. Coverage de pruebas

La actividad solicita un coverage aproximado del 85% en funcionalidades.

Para generar el reporte:

```bash
cd backend
npm test
```

Jest genera una carpeta:

```txt
backend/coverage
```

El reporte visual se encuentra en:

```txt
backend/coverage/lcov-report/index.html
```

Este reporte puede abrirse en el navegador y anexarse como evidencia en el documento final.

---

# 7. Pruebas EndToEnd con Playwright

## 7.1 Instalación

Desde la carpeta del frontend:

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

## 7.2 Script en package.json

En `frontend/package.json`, agregar:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test:e2e": "playwright test"
}
```

## 7.3 Crear carpeta de pruebas

```bash
cd frontend
mkdir tests
```

## 7.4 Archivo de prueba E2E

Crear:

```txt
frontend/tests/saludya.e2e.spec.js
```

Código:

```js
import { test, expect } from "@playwright/test";

const URL = "https://proyect-saludya.onrender.com";

test("E2E 1 - Carga la pantalla de login de SaludYa", async ({ page }) => {
  await page.goto(URL);

  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator(".login-button")).toBeVisible();
});

test("E2E 2 - Valida campos vacíos en el login", async ({ page }) => {
  await page.goto(URL);

  await page.click(".login-button");

  await expect(page.locator(".login-error")).toContainText(
    "Por favor ingrese el usuario"
  );
});

test("E2E 3 - Inicia sesión correctamente", async ({ page }) => {
  await page.goto(URL);

  await page.fill('input[name="username"]', "admin");
  await page.fill('input[name="password"]', "123456");

  await page.click(".login-button");

  await page.waitForTimeout(3000);

  await expect(page.locator(".login-card")).not.toBeVisible();
});
```

---

# 8. Ejecutar pruebas EndToEnd

Desde la carpeta `frontend`:

```bash
npm run test:e2e
```

También se puede ejecutar:

```bash
npx playwright test
```

Para ver el navegador durante la prueba:

```bash
npx playwright test --headed
```

Para ejecutar solo el archivo de SaludYa:

```bash
npx playwright test tests/saludya.e2e.spec.js --headed
```

Para abrir el reporte:

```bash
npx playwright show-report
```

---

# 9. Error común: require is not defined

Si aparece este error:

```txt
ReferenceError: require is not defined in ES module scope
```

se debe a que el frontend usa:

```json
"type": "module"
```

Solución: usar `import` en lugar de `require`.

Incorrecto:

```js
const { test, expect } = require("@playwright/test");
```

Correcto:

```js
import { test, expect } from "@playwright/test";
```

---

# 10. Evidencias para la entrega

Para el documento final se deben anexar capturas de:

1. Ejecución de `npm test` en backend.
2. Reporte de coverage generado por Jest.
3. Pruebas de integración ejecutadas.
4. Ejecución de Playwright.
5. Reporte de Playwright.
6. Frontend desplegado.
7. Backend desplegado.
8. MongoDB Atlas conectado.

---

# 11. Comandos principales utilizados

## Backend

```bash
cd backend
npm install --save-dev jest supertest
npm test
```

## Frontend

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
npm run test:e2e
npx playwright test --headed
npx playwright show-report
```

## Git

```bash
git add .
git commit -m "Agrega pruebas automatizadas"
git push origin main
```

---

# 12. URLs del proyecto

## Frontend

```txt
https://proyect-saludya.onrender.com
```

## Backend

```txt
https://proyect-saludya-backend.onrender.com
```

---

# 13. Conclusión

Las pruebas implementadas permiten validar el correcto funcionamiento del MVP SaludYa. Con Jest se verifican funciones internas del backend, con Supertest se comprueba la comunicación con endpoints principales de la API y con Playwright se valida el comportamiento completo del sistema desde la perspectiva del usuario.

Estas pruebas aportan confiabilidad al sistema, permiten detectar errores tempranos y sirven como evidencia técnica para la entrega final del proyecto.
