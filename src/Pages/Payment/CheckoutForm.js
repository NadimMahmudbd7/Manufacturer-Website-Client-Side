import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { success } from 'daisyui/src/colors';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

const CheckoutForm = ({product}) => {
    const id = product?.result?._id
    console.log(id);
    const [cardError,setCardError] = useState('')
    const[seccess,setSuccess] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const handleSubmit = async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
          }

          const card = elements.getElement(CardElement);
          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            setCardError(error.message)
            setSuccess('')
          } else {
            setSuccess('Payment SuccessFully')
            // setCardError('')

            axios.put(`https://cryptic-waters-16109.herokuapp.com/orders?id=${id}`)
            .then(res => {
                console.log(res);
            })

          }
          
          
        }
        console.log(stripe)
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
           
            <button disabled={product.result.payment==="paid"}  className='btn mt-4 btn-primary bg-blue-500' type="submit">
                Pay
            </button>
            <p><small className='text-red-700'>{cardError}</small></p>
            <p><small className='text-green-700'>{seccess}</small></p>
        </form>
    );
};

export default CheckoutForm;