function valorVenta(venta) {
  return venta.precio * venta.cantidad;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += venta.cantidad;
  }
  return total;
}

function ventaMayor(ventas) {
  if (ventas.length === 0) return null; 
  let mayor = ventas[0];
  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const venta of ventas) {
    if (venta.precio > 0 && venta.cantidad > 0) {
      total += valorVenta(venta);
      validas += 1;
    }
  }
  if (validas === 0) return 0;
  return total / validas;
}

function ventasPorCiudad(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const venta of ventas) {
    if (venta.ciudad.trim().toLowerCase() === buscada) {
      total += valorVenta(venta);
    }
  }
  return total;
}

module.exports = { unidadesVendidas, totalVendido, ventaMayor, ticketPromedio, valorVenta, ventasPorCiudad };