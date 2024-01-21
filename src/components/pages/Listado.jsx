import React from "react";
import { Global } from "../../helpers/Global";

export const Listado = ({ articulos, setArticulos }) => {

    return (

        articulos.map(articulo => {

            return (
                <article key={articulo.id} className="articulo-item">
                    <div className="mask">
                        {articulo.imagen  !="default.png"&& <img src={Global.url + "imagen/"+articulo.imagen}></img>}
                        {!articulo.imagen =="default.png" && <img src="https://www.nationalgeographic.com.es/medio/2023/08/25/perro_adf93861_1412331876_230825124420_800x800.jpg"></img>}
                    </div>

                    <div className="datos">
                        <h3 className="title">{articulo.titulo}</h3>
                        <p className="description">{articulo.contenido}</p>

                        <button className="edit">Editar</button>
                        <button className="delete">Borrar</button>
                    </div>
                </article>
            );
        })
    )
};
