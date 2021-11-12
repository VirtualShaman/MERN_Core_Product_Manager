import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import { useParams } from 'react-router';
import axios from 'axios';

const OneProductInfo = () => {
    const {id} = useParams();
    const history = useHistory();

    const [productInfo, setProductInfo] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response=>{
                console.log(response)
                setProductInfo(response.data)
            })
            .catch(err=> console.log(err))
    }, [id]);

    const deleteProduct = ()=>{
        axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            .then(response=>{
                console.log("Response after deletion:", response)
                history.push("/")
            })
            .catch(err=> console.log(err))
    }

    return (
        <div>
            {
                productInfo.name!=null?
                    <div>
                        <h1>{productInfo.name}</h1>
                        <h2>Price: {productInfo.price}</h2>
                        <h2>Description: {productInfo.description}</h2>
                        <button onClick={deleteProduct}>Delete</button>
                        <Link to = {`/editProduct/${productInfo._id}`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                :
                <div>
                    <h1>Sorry the product you are looking for is no longer available. If you would like to add this product or any others please go to the link above.</h1>
                </div>
            }
        </div>
    );
};

export default OneProductInfo;