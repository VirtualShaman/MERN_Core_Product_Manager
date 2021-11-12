import React, {useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from "react-router";
import axios from 'axios';

const EditProductForm = (props) => {
    const { id } = useParams();
    const history = useHistory();

    const [formInfo,setFormInfo] = useState({
        name:"",
        price:"",
        description:"",
    })

    const [formErrors, setFormErrors] = useState({
        name:"",
        price:"",
        description:"",
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response=>{
                console.log(response)
                setFormInfo(response.data)
            })
            .catch(err=> console.log(err))
    }, [id]);

    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/update/${id}`, formInfo)
            .then(response=>{
                console.log(response)
                if(response.data.err){
                    setFormErrors(response.data.err.errors)
                }else{
                    props.setFormSubmitted(!props.formSubmitted)

                    setFormInfo({
                        name:"",
                        price:"",
                        description:"",
                    })
                    history.push("/")
                }
            })
            .catch(err=>console.log("Error creating a product:", err))
    }

    return (
        <div>
            {
                formInfo.name!=null?
                <form onSubmit= {submitHandler}>
                    <div>
                        <label htmlFor="">Name:</label>
                        <input onChange={changeHandler} type="text" name="name" value={formInfo.name}/>
                        <p>{formErrors.name?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="">Price:</label>
                        <input onChange={changeHandler} type="text" name="price" value={formInfo.price}/>
                        <p>{formErrors.price?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="">Description:</label>
                        <textarea onChange={changeHandler} name="description" value={formInfo.description} cols="25" rows="5"></textarea>
                        <p>{formErrors.description?.message}</p>
                    </div>
                    <input type="submit" value="Update Product"/>
                    <Link to="/"><button>Cancel</button></Link>
                </form>
                :
                <div>
                    <h1>Sorry the product you are looking for is no longer available. If you would like to add this product or any others please go to the link above.</h1>
                </div>
            }
        </div>
    );
};

export default EditProductForm;