import React from 'react';
import './styles.css'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import { ManageProducts } from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Card from './core/Card';
import Cart from './core/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/admin/dashboard" exact component={AdminDashBoard} />
        <Route path="/admin/create/category" exact component={AddCategory} />
        <Route path="/admin/create/product" exact component={AddProduct} />
        <Route path="/admin/categories" exact component={ManageCategories} />
        <Route path="/admin/products" exact component={ManageProducts} />
        <Route path="/admin/product/update/:productId" exact component={UpdateProduct} />
        <Route path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        <Route path="/cart" exact component={Cart} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
