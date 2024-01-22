import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from "../../hooks/useForm"
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState([]);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if ((datos.message === "Success")) {

      setArticulo(datos.data[0]);
    }

    console.log(articulo);

  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = formulario;

    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);

    if (datos.code === 200) {
      setResultado("guardado");
    } else {
      setResultado("error")
    }

    const fileInput = document.querySelector("#file");

    if (datos.code === 200 && fileInput.files[0]) {

      setResultado("guardado");

      const formData = new FormData();

      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + params.id, "POST", formData, true);


      if (subida.code === 200) {

        setResultado("guardado");
      }

    }

  }

  return (
    <div className='jumbo'>

      <h1>Editar articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>
      <strong>{resultado == "guardado" ? "Articulo guardado con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Error en los datos proporcionados" : ""}</strong>

      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido" >Contenido</label>
          <textarea type='text' name="contenido" onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <div className="mask">
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}></img>}
            {articulo.imagen == "default.png" && <img src="https://www.nationalgeographic.com.es/medio/2023/08/25/perro_adf93861_1412331876_230825124420_800x800.jpg"></img>}
          </div>
          <input type="file" name='file0' id="file" />
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
