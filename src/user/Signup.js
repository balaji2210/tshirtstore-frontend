import React,{useState} from 'react'
import { useHistory } from 'react-router'
import { signup } from '../auth/helper'
import Base from '../core/Base'



export default function Signup() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const history=useHistory()

    const handelSubmit=(e)=>{
        e.preventDefault()
        signup({name,email,password})
        .then(data=>{
            console.log(data)
            history.push('/signin')
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const signupForm=()=>{
        return (
            <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form onSubmit={handelSubmit}>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-success btn-block form-control rounded">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Base title="SIGNUP" description="Signup Page">
            {signupForm()}
            </Base>
        </div>
    )
}
