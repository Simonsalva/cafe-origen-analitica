# Bitácora · Café Origen Analítica

## MiniReto 1 · Primer tueste

### Exploración

Corrí `node src/explorar.js` para mirar la muestra antes de tocar nada. Esto fue lo que vi:

- Hay 12 registros en total.
- El primero es el id 1: Origen Huila 500 g, vendido en Medellín.
- El último es el id 12: Origen Nariño 250 g, vendido en Bogotá.
- En la posición 4 está Origen Sierra 500 g. Al principio esperaba ver el id 4, pero es el id 5, porque los índices del arreglo empiezan en 0.

### Diccionario de datos

Revisé la tabla registro por registro para entender qué guarda cada propiedad:

- **id** (number): el número único de cada venta.
- **fecha** (string): el día de la venta en formato AAAA-MM-DD. Ojo: es texto, no un tipo fecha.
- **cliente** (string): el código del cliente que compró (C01, C02…).
- **producto** (string): el nombre del producto vendido.
- **ciudad** (string): la ciudad donde se hizo la venta.
- **cantidad** (number): cuántas unidades salieron en esa venta.
- **precio** (number): lo que cuesta una unidad, en pesos colombianos.

Algo que noté: el valor de cada venta no viene en los datos. Lo tengo que calcular yo multiplicando `cantidad × precio`.

### Casos borde detectados

Mirando con calma encontré cuatro cosas raras en los datos. Esto fue lo que decidí con cada una:

**1. Una ciudad escrita en minúscula.**
En el id 5 dice "medellín" en vez de "Medellín". Si comparo tal cual, el programa la contaría como otra ciudad. Antes de comparar o agrupar voy a normalizar con `trim()` y `toLowerCase()`, para que cuente como Medellín.

**2. Una venta con cantidad 0.**
El id 8 (Origen Huila 500 g en Cali) tiene cantidad 0. No la borro de los datos, pero tampoco la cuento como venta válida: su valor es 0 y no entra en el ticket promedio.

**3. Clientes que compran varias veces.**
C01 aparece 3 veces (ids 1, 4 y 11), y C02 y C03 aparecen 2 veces cada uno. No es un error, pero hay que tenerlo en cuenta: son 12 ventas pero solo 8 clientes. Cuando una pregunta hable de clientes, los cuento sin repetir.

**4. La fecha es texto.**
Todas las fechas son strings. Para comparar días uso el texto completo ("2026-09-04") sin convertirlo, porque el formato AAAA-MM-DD ya sirve para eso.

Dejé `datos.js` tal como vinieron los datos, con sus errores. La limpieza la hago en las funciones, no en los datos, para que sea una decisión mía y no un accidente.
