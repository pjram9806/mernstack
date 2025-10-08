import React, { useState } from 'react';
import ProductService from '../services/ProductService';

let ProductCart = ()=>
{
    let [state,setState] = useState({
        products:ProductService.getAllProducts()
    });

    let {products} = state;
    return(
        <React.Fragment>
            <div className="container my-3">
                <div className="row">
                    <div className="col-8">
                        {
                            products.map((product)=>{
                                return(
                                    <div key ={product.id} className="card shadow-lg mt-3">
                                       <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <h5 className="display-4">{product.name}</h5>
                                                <h6 className="display-6">&#8377;{product.price.toFixed(2)}</h6>
                                                <h6 className="display-6">
                                                    {
                                                        product.qty >=10 && <span className="text-success">Available</span>
                                                    }
                                                    {
                                                        product.qty <=10 >=1 && <span className="text-warning">Almost Out Of Stock</span>
                                                    }
                                                    {
                                                        product.qty === 0 && <span className="text-danger"> Out Of Stock</span>
                                                    }
                                                </h6>
                                            </div>
                                            <div className="col-4">
                                                <img src={product.img} alt="watches" className='img-fluid'/>
                                            </div>
                                        </div>
                                       </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductCart;