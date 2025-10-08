import React, { useState } from "react";

let ProductItem = ()=>
    {

     let [state,setState] = useState({
        product:{
            sno:'AA001',
            img:'https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202308/redmi-watch-3-active-023244-1x1.jpg?VersionId=IfQCB498vfZGz1Sbiy1ZnIM8FfffS1x9',
            name:'Mi Watch',
            price:1500,
            qty:2
        }
     })

     let incrementCount = ()=>
        {
            setState(()=>({
                product:{
                    ...state.product,
                    qty:state.product.qty+1
                }
            }))
        }

        let decrCount = ()=>
            {
                setState(()=>({
                    product:{
                        ...state.product,
                        qty:state.product.qty > 0 ? state.product.qty-1:0

                    }
                }))
            }
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4">ProductItem</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, consectetur impedit rem provident minus aliquam, eaque voluptatem tenetur ut ad obcaecati eligendi dolorum culpa recusandae?</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className="table table-primary text-center table-hover"> 
                                <thead>
                                    <tr>
                                        <th>SNO</th>
                                        <th>Img</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{state.product.sno}</td>
                                        <td>
                                            <img src={state.product.img} alt="watch" width={50} height={50} />
                                        </td>
                                        <td>{state.product.name}</td>
                                        <td>{state.product.price}</td>
                                        <td> 
                                            <button className="btn btn-sm btn-primary" onClick={incrementCount}>+</button>
                                            {state.product.qty}
                                            <button className="btn btn-sm btn-danger" onClick={decrCount}>-</button>
                                            
                                        </td>
                                        <td>{state.product.qty * state.product.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

export default ProductItem