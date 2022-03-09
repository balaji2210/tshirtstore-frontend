import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../auth/helper';
import { loadCart } from '../user/helper/carthelper';
import Base from './Base'
import Card from './Card';
import { PaymentBrain } from './PaymentBrain';
import StripeCheckout from './StripeCheckout';



function Cart() {
    const {user}=isAuthenticated();
    const history=useHistory()
    const [products, setproducts] = useState([])
    const [reload, setReload] = useState(false)

    const load=loadCart()


    const loadAllProducts=(products)=>{
        return (
            <div>
                <h2>This Section is to load Products</h2>
                {load&&products.map((produt,index)=>(
                    <Card product={produt}  key={index} addToCart={false} removeFromCart={true} setReload={setReload} reload={reload}/>
                ))}
            </div>
        )
    }

    const loadCheckOut=()=>{
        return (
            <div>
                <h2>This Section is for Checkout</h2>
            </div>
        )
    }

    
    useEffect(()=>{setproducts(loadCart())},[reload])
    
    
    return (
        <div>
        {user?<Base title="Cart" description="Welcome to Cart">
                <div className='row text-center'>
                <div className="col-6">{loadAllProducts(products)}</div>
                <div className="col-6"><StripeCheckout 
                    products={products}
                    setReload={setReload}
                    reload={reload}
                />
                <PaymentBrain products={products} setRelaod={setReload} />
                </div>
                </div>
            </Base>:history.push('/signin')}
            
        </div>
    )
}

export default Cart; 
