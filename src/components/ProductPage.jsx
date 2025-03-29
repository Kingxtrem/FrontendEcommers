import React from 'react'
import { useParams } from 'react-router-dom'
const ProductPage = () => {
    const  {id}=useParams()
  return (
    <div>
      <p>hello{id}</p>
    </div>
  )
}

export default ProductPage
