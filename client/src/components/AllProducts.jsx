import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Link} from "react-router-dom"
import e from 'cors';

const AllProducts = (props) => {

    const [allProducts, setAllProducts] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products/")
            .then(response=>{
                console.log("All products response:", response)
                setAllProducts(response.data.sort((a, b) => a.name.localeCompare(b.name)))
            })
            .catch(err=>console.log("Error Message:", err))
    },[props.formSubmitted, deleteToggle])

    const deleteProduct = (productID)=>{
        axios.delete(`http://localhost:8000/api/products/delete/${productID}`)
            .then(response=>{
                console.log("Response after deletion:", response)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <h1>Product List</h1>
            {
                allProducts.map((product,i)=>{
                    return (
                        <div key = {i}>
                            <h2><Link to = {`/product/${product._id}`}>{product.name}</Link></h2>
                            <div>
                                <button onClick = {(e)=>deleteProduct(product._id)} >Delete</button>
                                <Link to = {`/editProduct/${product._id}`}>
                                <button>Edit</button>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AllProducts;