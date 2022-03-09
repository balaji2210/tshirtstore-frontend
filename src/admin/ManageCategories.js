import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteCategory, getAllCategories } from './helper/adminapicall'



function ManageCategories() {

  const [categories,setCategories]=useState([])
  const {user,token}=isAuthenticated()

    const preload=()=>{
      getAllCategories()
      .then(data=>{setCategories(data)})
      console.log(categories)
    }


    useEffect(()=>{preload()},[])

    const deleteACategory=categoryId=>{
      deleteCategory(categoryId,user._id,token)
      .then(data=>{preload()})
    }



    return (
        <div>
           <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total Categories: {categories.length}</h2>

          {categories && categories.map((cate,index)=>(<div className="row text-center mb-2 " key={index}>
            <div className="col-4">
              <h3 className="text-white text-left">{cate.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/category/update/${cate._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteACategory(cate._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>))}
        </div>
      </div>
    </Base>
        </div>
    )
}

export default ManageCategories
