import React,{useEffect, useState} from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base';
import { Link, useHistory } from 'react-router-dom';
import {  getCategory, updateCategory } from './helper/adminapicall';



function UpdateCategory({match}){
    const {user,token}=isAuthenticated();
    const history=useHistory()
    const [name, setName] = useState('');
    const [display, setDisplay] = useState(false);

    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-dark mb-3 text-success rounded" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handelSubmit=(e)=>{
        e.preventDefault()
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data=>console.log(data))
        setName('')
        setDisplay(true)
        setTimeout(()=>{setDisplay(false,history.push('/admin/categories'))},1000)
        
    }
    const Added=()=>(
        <div className="rounded mt-2">
            <h4 className="text-success text-center bg-white">Updated Created</h4>
        </div>
    )

    const myCategoryForm=()=>(

        <form onSubmit={handelSubmit}>
            <div className="form-group">
            {display?Added():""}
                <p className="lead">Enter The Category</p>
                <input type="text" className="form-control my-3" autoFocus required placeholder="For EX. SUMMER" value={name} onChange={e=>setName(e.target.value)} />
                <button className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    )

    const preload=categoryId=>{
        getCategory(categoryId)
        .then(data=>{setName(data.name)})
    }

    useEffect(()=>{preload(match.params.categoryId)},[])

    return (
        
        <div>
        {user.role===1?
           <Base title="Update a Category" description="Category Updation" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {myCategoryForm()}{goBack()}
                </div>
            </div>
           </Base>:history.push('/')}
        </div>
    )
}

export default UpdateCategory
