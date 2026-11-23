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

## MiniReto 2 · Los números del día

### Plan antes de programar

Antes de tocar `analitica.js` escribí en palabras cómo voy a calcular cada indicador. Para cada uno me hice las mismas cuatro preguntas: qué recorro, qué condición aplico, qué acumulo y con qué valor arranco.

**valorVenta(venta)**
No recorre nada. Recibe una sola venta y devuelve cantidad × precio. Es la pieza base: todas las demás funciones la usan en vez de multiplicar por su cuenta.

**totalVendido(ventas)**
Patrón acumulador.
- Arranco con total en 0.
- Recorro todas las ventas.
- En cada una le sumo valorVenta(venta) al total.
- No necesito condición: la venta con cantidad 0 suma 0, así que no daña el resultado.
- Al final devuelvo el total.

Con la muestra debería dar 985.000.

**unidadesVendidas(ventas)**
También es un acumulador, pero de unidades en vez de plata.
- Arranco con unidades en 0.
- Recorro todas las ventas y le sumo la cantidad de cada una.
- Devuelvo las unidades.

**ventaMayor(ventas)**
Patrón máximo. Lo que devuelvo es el registro completo, no solo el número.
- Arranco con mayor en null, que significa "todavía no he visto ninguna venta".
- Recorro las ventas.
- Si mayor es null, o si el valor de esta venta es más grande que el valor de mayor, guardo esta venta como la nueva mayor.
- Al final devuelvo mayor.

Pensé en arrancar con la primera venta del arreglo, pero si el arreglo viene vacío no hay primera venta. Por eso arranco en null: con un arreglo vacío la función devuelve null, que quiere decir "no hay venta mayor", en vez de reventar.

**ticketPromedio(ventas)**
Aquí uso dos patrones al mismo tiempo: un acumulador y un contador.
- Arranco con total en 0 y validas en 0.
- Recorro las ventas.
- Solo si la cantidad es mayor que 0: le sumo valorVenta(venta) al total y le sumo 1 a validas.
- Si al final validas es 0, devuelvo 0. Si no, devuelvo total ÷ validas.

Ese "si validas es 0" es lo más importante del plan: sin esa condición, un arreglo vacío termina en 0 ÷ 0 y eso da NaN. Es justo el error que reportó la gerente.

**ventasPorCiudad(ventas, ciudad)**
Acumulador con condición.
- Antes del ciclo normalizo la ciudad que me piden: le quito espacios con trim() y la paso a minúsculas con toLowerCase().
- Arranco con total en 0.
- Recorro las ventas y normalizo también la ciudad de cada una, de la misma forma.
- Si las dos ciudades normalizadas son iguales, le sumo valorVenta(venta) al total.
- Devuelvo el total.

Así "Medellín", "medellín" y "Medellín " terminan siendo la misma ciudad. Tengo que normalizar los dos lados: si solo normalizo uno, la comparación sigue fallando.
