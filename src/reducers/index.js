import { combineReducers } from 'redux';
import lineproduct from "./lineproducts"
import brand from "./brand"
import products from './product';
// import detail from './detail';
// import detailProduct from './detailProduct';
import order from "./order"
import shipper from "./shipper"
import orderSupply from "./orderSupply"
import receipt from "./receipt"
import invoice from "./invoice"
import employee from "./employee"
import promotion from './promotion'
import shippingCompany from './shippingCompany'
import user from './user'
import category from './category'


const appReducers = combineReducers({
    lineproduct,
    brand,
    products,
    order,
    shipper,
    orderSupply,
    receipt,
    invoice,
    employee,
    promotion,
    shippingCompany,
    user,
    category
});

export default appReducers;