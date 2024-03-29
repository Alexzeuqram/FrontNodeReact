export const Peticion = async (url, metodo, datosGuardar = "", archivos = false) => {
  let cargando = true;

  let opciones = {
    method: "GET",
  };

  if (metodo === "GET" || metodo === "DELETE") {

    opciones = {

      method: metodo,
      
    };
  }


  if (metodo === "POST" || metodo === "PUT") {

    let body = new URLSearchParams(datosGuardar);

    if (archivos) {

      opciones = {

        method: metodo,
        body: datosGuardar

      };

    } else {

      opciones = {

        method: metodo,
        body: new URLSearchParams(datosGuardar),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

    }

  }

  const peticion = await fetch(url, opciones);
  const datos = await peticion.json();

  cargando = false;

  return {
    datos,
    cargando,
  };
};