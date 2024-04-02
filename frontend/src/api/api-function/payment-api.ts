import toast from "react-hot-toast";
import { axiosCall } from "../axios-instence";
import { paymentEndpoints } from "../api-endpoint";
import rzp from '../../assets/rzp.png';
import useRazorpay from "react-razorpay";
import { resetCart } from "../../redux/slice/cartSlice";



//script to run on runtime 
const LoadScript = (src:any)=>{
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export const buyCourse = async(courses:any,token:any,userDetail:any,dispatch:Function,navigate:Function)=>{
    const toastId = toast.loading('verifying ..')
    try {
        const res = await LoadScript("https://checkout.razorpay.com/v1/checkout.js");
    
        if (!res) {
            toast.error('Razorpay SDK failed to load');
            toast.dismiss(toastId);
            return;
        }
         //initiate the order
         const orderResponse = await axiosCall(
            'post',
             paymentEndpoints.COURSE_PAYMENT_API,
             {courses},{
                access_token:token,
             }
         ) 
         if (orderResponse.status != 200) {
            throw new Error(orderResponse.data.message);
    
         }
         console.log('orderResponse >>>>>',orderResponse);
         
         //options
        const options={
            key:import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount : orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:'AirScholar',
            description:'Thank You for Purchasing the Course',
            image:"http://localhost:5173/src/assets/rzp.png",
            prefill:{
                name : `${userDetail.firstName} ${userDetail.lastName}`,
                email:userDetail.email,
            },
            handler:function (res:any){
                verifyPayment({...res, courses}, token, navigate, dispatch)
            }
        }
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        
        paymentObject.on("payment.failed", function(response:any) {
            toast.error("oops, payment failed");
            console.log(response);
        })
    
       } catch(error:any) {
        console.log(error);
        toast(error.response.data.message, {
            icon: '🚫',
          });
        // toast.error(`error while purchase`)
       }
    toast.dismiss(toastId);
}
//verfy payment funciton 
const verifyPayment =async(data:any , token:any , navigate:Function, dispatch:Function)=>{
   console.log('data',data);
   
    const toastId = toast.loading('verifying payment..');
    try {
        
        const responce = await axiosCall(
            'post',
            paymentEndpoints.COURSE_VERIFY_API,
            data,{
                access_token:token,
            }
        )
        if (responce.status === 200) {
            toast.success('payment successful');
            //navigate and empty the cart
            dispatch(resetCart());
            navigate('/dashboard/enrolled-courses');
        }
    } catch (error) {
        console.log(error);
        toast.error('payment failed')
    }
    toast.dismiss(toastId);
 }