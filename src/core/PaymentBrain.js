import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "../user/helper/carthelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbheper";
import { createOrder } from "./helper/orderhelper";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";







export const PaymentBrain = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const {user,token}=isAuthenticated()
  const load=loadCart()
  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(user._id, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(user._id, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData={
            products:products,
            transaction_id:response.transaction.id,
            amount:response.transaction.amount
          }
          createOrder(user._id,token,orderData)
          cartEmpty(()=>{
              console.log("Did we got a crash?")
          })
          //TODO: force reload
          setReload(!reload)
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
   load&&products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

