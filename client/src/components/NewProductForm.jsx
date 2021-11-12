import React, {useState} from 'react';
import axios from 'axios';

const NewProductForm = (props) => {
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

    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/products/create", formInfo)
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
                }
            })
            .catch(err=>console.log("Error creating a product:", err))
    }

    return (
        <div>
            <h1>Post A New Product</h1>
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
                <input type="submit" value="Post New Product"/>
            </form>
        </div>
    );
};

export default NewProductForm;