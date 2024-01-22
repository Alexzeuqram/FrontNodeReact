import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>

      <h1>Bienvenido al blog</h1>
      <p>Blog desarrollado para practicar, se uso React como Front, NodeJS como Back y MySQL para la base de datos.</p>
      <Link to="/articulos" className='button'>Ver los articulos</Link>
      
    </div>
  )
}
