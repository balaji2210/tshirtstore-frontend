import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../auth/helper';
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';



function Home() {
    const {user}=isAuthenticated();
    const history=useHistory()
    const [products,setProducts]=useState([])
    
    const loadAllProducts=()=>{
        getProducts()
        .then(data=>{setProducts(data)})
    }

    useEffect(()=>{loadAllProducts()},[])
    return (
        <div>
        {user?<Base title="Home" description="Welcome to Tshirt Store">
                <div className='row text-center'>
                <h1 className="text-white">ALL of tShirts</h1> 
                <div className="row">
                    {products.map((product,index)=>(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    ))}
                </div>   
                </div>
            </Base>:history.push('/signin')}
            
        </div>
    )
}

export default Home; 
