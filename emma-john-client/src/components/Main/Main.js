import React, { createContext, useState } from 'react';
import Header from '../Header/Header'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Shop from '../Shop/Shop';
import Review from '../Review/Review';
import Inventory from '../Inventory/Inventory';
import NotFound from '../NotFound/NotFound';
import ProductDetail from '../ProductDetail/ProductDetail';
import Login from '../Login/Login';
import Shipment from '../Shipment/Shipment';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function Main() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>      
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Shop/>
                    </Route>

                    <Route path="/shop">
                        <Shop/>
                    </Route>

                    <Route path="/review">
                        <Review/>
                    </Route>

                    <PrivateRoute path="/inventory">
                        <Inventory/>
                    </PrivateRoute>

                    <Route path="/login">
                       <Login/>
                    </Route>
                    
                    <PrivateRoute path="/shipment">
                        <Shipment/>
                    </PrivateRoute>

                    <Route path="/product/:id">
                        <ProductDetail/>
                    </Route>

                    <Route path="*">
                       <NotFound/>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default Main;
