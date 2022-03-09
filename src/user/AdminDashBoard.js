import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import {Link, useHistory} from 'react-router-dom'

export default function AdminDashBoard() {

    const {user}=isAuthenticated()
    const history=useHistory();

    const adminLeftSide=()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    <Link to="/admin/create/category" className="nav-link text-success">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                    <Link to="/admin/categories" className="nav-link text-success">Manage Category</Link>
                    </li>
                    <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-success">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide=()=>{
        return (
          <div className="card mb-4">
              <h4 className="card-header">Admin Info</h4>
              <ul className="list-group">
                  <li className="list-group-item">
                      <span className="badge badge-success mr-2">Name: </span>{user.name}
                  </li>
                  <li className="list-group-item">
                      <span className="badge badge-success mr-2">Email </span> {user.email}
                  </li>
                  <li className="list-group-item">
                      <span className="badge badge-danger">Admin Area</span>
                  </li>
              </ul>
          </div>
        )
    }

    return (
        <div>
        {user.role===1?
            <Base title="Admin DashBoard" description="Welcome Admin" className="container bg-success p-4 ">
            <div className="row">
                <div className="col-3"> {adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
            </Base>:history.push('/')}
        </div>
    )
}
