import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  let [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {

    conseguirArticulos();

  }, [params]);

  const conseguirArticulos = async () => {

    const { datos, cargando } = await Peticion(Global.url + "buscar/" + params.busqueda, "GET");

    console.log(params.busqueda)
    console.log(datos.data)

    if ((datos.status === "success")) {

      setArticulos(datos.articulos);
    } else {
      setArticulos([]);

    }

    setCargando(false);
  };

  return (
    <>
      {cargando ? "cargando.." :
        articulos.length >= 1 ?
          <Listado articulos={articulos} setArticulos={setArticulos} />
          : <h1>No hay articulos</h1>


      }
    </>
  );
};
