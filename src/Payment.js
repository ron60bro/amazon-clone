import { BakeryDiningTwoTone } from "@mui/icons-material";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
function Payment() {
    const navigate=useNavigate()
  const [{ basket, user }, dispatch] = useStateValue;

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const[succeeded,setSucceeded]=useState(false);
  const[processing,setProcessing]=useState("");
  const[clientSecret,setClientSecret]=useState(true)
  const stripe = useStripe();
  const elements = useElements();

    useEffect(()=>{
        const getClientSecret=async()=>{
            const response=await axios({
                method:"POST",
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])


  const handleSubmit = async(event) => {
    // do all the fancy stripe
    event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent== payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false)
            dispatch({
                type:"EMPTY_BASKET"
            })
            navigate("/orders")
        })

        // const payload=await stripe
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(
          <Link to="/chekout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {basket.map((item) => (
            <CheckoutProduct
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total:{value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
              <span>{processing?<p>Processing</p>:"Buy Now"}</span>
              </button>

            </div>
                {error&& <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
