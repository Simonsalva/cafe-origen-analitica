const ventas = require("./datos");
const { totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad } = require("./analitica");

console.log(totalVendido(ventas));
console.log(unidadesVendidas(ventas));
console.log(ventaMayor(ventas));
console.log(ticketPromedio(ventas));
console.log(ventasPorCiudad(ventas, "Medellín"));
console.log(ventasPorCiudad(ventas, "  medellín "));
