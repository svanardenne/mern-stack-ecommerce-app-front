import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManagedProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <AdminRoute exact path="/admin/orders" component={Orders} />
        <PrivateRoute exact path="/profile/:userId" component={Profile} />
        <AdminRoute exact path="/admin/products" component={ManagedProducts} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
