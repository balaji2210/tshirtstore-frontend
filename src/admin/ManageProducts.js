import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import { deleteProduct, getAllProducts } from './helper/adminapicall'




export const ManageProducts=()=> {

    const {user,token}=isAuthenticated()
    const history=useHistory()
    const [products, setProducts] = useState([])

    const preload=()=>{
        getAllProducts()
        .then(data=>setProducts(data))
        console.log(products)
    }

    useEffect(()=>{preload()},[])

    const deleteAProdut=productId=>{
        deleteProduct(productId,user._id,token)
        .then(data=>{preload()})
    }


    return (

        <div>
        {user.role===1?
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3"> Total Products: {products.length}</h2>
          {products && products.map((product,index)=>{
           return <div  key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteAProdut(product._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
            </div>
          })}
        </div>
      </div>
    </Base>:history.push('/')}
    </div>
    )
}
