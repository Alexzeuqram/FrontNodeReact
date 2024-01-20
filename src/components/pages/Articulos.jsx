import React from "react";
import { useState, useEffect } from "react";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirArticulos();
  }, [])

  const conseguirArticulos = async() => {
    const url = "https://jarednodejs.onrender.com/articulos/articulos";
    
    let peticion = await fetch(url, {
      method: "GET",
    });

    let datos = await peticion.json();
    console.log(datos);
    
    if(datos.status === "success"){
     setArticulos(datos.articulos);
    }
  };

  return (
    <>
      {articulos.map((articulo) => {
        return (
          <article key={articulos._id} className="articulo-item">
            <div className="mask">
              <img src="https://www.nationalgeographic.com.es/medio/2023/08/25/perro_adf93861_1412331876_230825124420_800x800.jpg"></img>
            </div>

            <div className="datos">
              <h3 className="title">{articulos.titulo}</h3>
              <p className="description">{articulo.contenido}</p>

              <button className="edit">Editar</button>
              <button className="delete">Borrar</button>
            </div>
          </article>
        );
      })}
    </>
  );
};
