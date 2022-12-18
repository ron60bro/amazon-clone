import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import {useStateValue} from "./StateProvider"
import { Check } from "@mui/icons-material";
import CheckoutProduct from "./CheckoutProduct";
const Checkout = () => {
    const[{basket},dispatch]=useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="chekout__ad"
          src="
            https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />

        <div className="checkout__title">
          <h2 >Your shoppipng Basket</h2>
          {basket.map(item=>(
            <CheckoutProduct 
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            />
          ))}
        </div>
       
      </div>
      <div className="checkout__right">
          <h2><Subtotal/></h2>
        </div>
     
    </div>
  );
};

export default Checkout;
