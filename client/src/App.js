import React, {useState} from 'react';

import './App.css';
import AllProducts from './components/AllProducts';
import NewProductForm from './components/NewProductForm';
import OneProductInfo from './components/OneProductInfo';
import EditProductForm from './components/EditProductForm';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">

        <Link to="/"><button>Home</button></Link>

        <Switch>

          <Route exact path="/">
            <NewProductForm formSubmitted = {formSubmitted} setFormSubmitted= {setFormSubmitted}/>
            <hr/>
            <AllProducts formSubmitted = {formSubmitted} setFormSubmitted= {setFormSubmitted}/>
          </Route>

          <Route exact path = "/product/:id">
            <OneProductInfo/>
          </Route>

          <Route exact path = "/editProduct/:id">
            <EditProductForm formSubmitted = {formSubmitted} setFormSubmitted= {setFormSubmitted}/>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
