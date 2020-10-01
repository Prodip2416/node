import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Revies from './components/Review/Review';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound.js/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Header />

      <Router>
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
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
