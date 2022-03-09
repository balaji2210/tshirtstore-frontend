import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from '../user/helper/carthelper'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import {createOrder} from "../core/helper/orderhelper"

function StripeCheckout({
    products,setReload=f=>f,
    reload=undefined
}) {

    const {user,token}=isAuthenticated()
    const load =loadCart()

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    const getfinalPrice=()=>{
        let amount=0;
        load&&products.map(p=>(
            amount=amount+p.price
        ))
        return amount
    }

    const makePayment=(token)=>{
        const body={
            token,
            products
        }
        const headers={
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayments`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(res=>{
            console.log(res)
            //call fun
        })
        .catch(err=>console.log(err))
    }

    const showStripeButton=()=>{
        return user ? (
            <StripeCheckoutButton 
            stripeKey="pk_test_51Iwi7tSBzzaYG1vg4XOuPnavTjEd70e3TNNBAnRWB1hYET3Gl0tQnZ4zqS2CqINkTZU9mLbVR2f7oJPs89oKPoVR00UyP5tciI"
            token={makePayment}
            amount={getfinalPrice()}
            name="BUY Tshirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ):(
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }
    
   
    return (
        <div>
        <h3 className="text-white">Stripe Check Out {getfinalPrice()}</h3> 
        {showStripeButton()}    
        </div>
    )
}

export default StripeCheckout
