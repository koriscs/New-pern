import React , {useState} from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import { checkOutCustomer } from '../api/cart';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setItemCount } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}


export default function PaymentForm() {
    const [succes, setSucces] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useSelector(state=> state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try{
            const {id} = paymentMethod
            const response = await axios.post("/auth/checkout", {
                amount: 100,
                id
            })
            if(response.data.success) {
                try{
                  const results =  await checkOutCustomer(user);
                }catch(error){
                    console.log(error)
                }
                setSucces(true);
                dispatch(setItemCount(0));
                toast.success('You just bought some sweet stuff!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                navigate('/account')
                    
            }
        } catch (error) {
            console.log("Error", error)
        }

    } else {
        console.log(error.message)
    }
}
  return (
    <>
    {!succes ?

    <form className='payment-form' onSubmit={handleSubmit}>
        <fieldset className='FormGroup' >
        <div className='FormRow' >
            <CardElement options={CARD_OPTIONS} />
        </div>
        </fieldset>
        <button className='pay-button' >Pay</button>    
     </form>
     :<div>
     </div>}
    </>
  )
}
