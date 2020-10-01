import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >    
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <Shop />
          </Route>

          <Route path="/shop">
            <Shop />
          </Route>

          <Route path="/review">
            <Review />
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
