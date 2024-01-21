import React from 'react'
import { useState } from 'react';
import { useForm } from "../../hooks/useForm"
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global'

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();


    let nuevoArticulo = formulario;

    const { datos} = await Peticion(Global.url + "crear", "POST", nuevoArticulo);
   


    if (datos.code === 201) {
      setResultado("guardado");

      const fileInput = document.querySelector("#file")
      
      
      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/"+datos.data, "POST", formData, true);
    
      
      


    } else {
      setResultado("error");
    }
    console.log(datos);
  }

  return (
    <div className='jumbo'>

      <h1>Crear articulo</h1>
      <p>Formulario para crear un articulo</p>
      <strong>{resultado == "guardado" ? "Articulo guardado con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Error en los datos proporcionados" : ""}</strong>

      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido" >Contenido</label>
          <textarea type='text' name="contenido" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type="file" name='file0' id="file" />
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
