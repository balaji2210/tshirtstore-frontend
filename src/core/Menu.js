import React from 'react'
import {Link,useHistory,withRouter} from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'


function Menu() {

    const history=useHistory()
    const {user}=isAuthenticated();
    const signout=()=>{
        localStorage.clear()
        history.push('/signin')
    }
    
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
            {user?<><li className="nav-item">
                    <Link className="nav-link text-white" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to='/cart'>Cart</Link>
                </li>
                <li className="nav-item">
                   {user.role?<Link className="nav-link text-white" to='/admin/dashboard'>A.Dashboard</Link>:<Link className="nav-link text-white" to='/user/dashboard'>Dashboard</Link>}
                </li>
                <li className="nav-item ">
                    <Link className="nav-link text-white" to='/' onClick={signout}>SignOut</Link>
                </li></>:<><li className="nav-item">
                    <Link className="nav-link text-white" to='/signup'>SignUp</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to='/signin'>SignIn</Link>
                </li></>}
                
                
                
            </ul>
        </div>
    )
}

export default withRouter(Menu)
