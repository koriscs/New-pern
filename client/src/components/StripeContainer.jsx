import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51LKJrwJ4VGD5n1ok4DmCFlKXK2RMDyE2Q663kQDTRC32NCWQCAJIqHkycUoUC2xqunv3NAUfmgDlA3B7HkZIQk5M00onPk6229"

const stripeTestPromise = loadStripe(PUBLIC_KEY); 

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise} >
        <p className='checkout-text' >This is only a project website!For check out pls use a fake Card! Card Number:4242 4242 4242 4242 and just fill out the rest with random numbers!</p>
        <PaymentForm/>
    </Elements>
  )
}
