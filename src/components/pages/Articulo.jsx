import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulo = () => {
  const [articulo, setArticulo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);




  const conseguirArticulo = async () => {
    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if ((datos.message === "Success")) {
      console.log(datos.data[0]);
      setArticulo(datos.data[0]);
    }

    setCargando(false);
    console.log(articulo);


  };

  return (

    <div className="jumbo">

      <>
        {cargando ? "cargando.." :
          <>
            <div className="mask">
              {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}></img>}
              {articulo.imagen == "default.png" && <img src="https://www.nationalgeographic.com.es/medio/2023/08/25/perro_adf93861_1412331876_230825124420_800x800.jpg"></img>}
            </div>
            <h1>{articulo.titulo}</h1>
            <span>{articulo.fecha}</span>
            <p>{articulo.contenido}</p>
          </>

        }
      </>
    </div>

  );
};
