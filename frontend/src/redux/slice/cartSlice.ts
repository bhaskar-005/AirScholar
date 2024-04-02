import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface cartState {
    totalItems: number |string ;
    cart:any;
    totalMoney : number |string ;
}
const initialState:cartState = {
        cart: localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart")!)
          : [],
        totalMoney: localStorage.getItem("total")
          ? JSON.parse(localStorage.getItem("total")!)
          : 0,
        totalItems: localStorage.getItem('totalItems')
        ? JSON.parse(localStorage.getItem('totalItems')!)
        : 0  
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
       addToCart(state,actions){
       if (!localStorage.getItem('token')) {
        toast.error('You are not logged in.')
          return ;
        }
         const course = actions.payload;
         //chacking the index of the course if it belongs to the cart 
         if(state.cart.findIndex((item:any)=> item._id == course._id) >= 0 ){
             toast.error('item already in cart');
             return;
         }
         //if not push the course into the cart
         state.cart.push(course);
         //adding the price and the quantity
         state.totalItems = state.cart.length;
         state.totalMoney = +state.totalMoney + course.price;
         
         // Update to localstorage
          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem("total", JSON.stringify(state.totalMoney));
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        
          toast.success('item added successfully');
       } ,
       removeCart(state,actions){
        console.log('cart remove');
        
         const course = actions.payload;
         const index = state.cart.findIndex((item:any)=> item._id == course._id);
         if ( index >= 0 ) {
            state.totalItems = +state.totalItems -1;
            state.totalMoney = +state.totalMoney - course.price;
            state.cart.splice(index,1); //it will remove one element from the index
            
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.totalMoney));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            
            toast.success('item removed successfully');
         }
       } ,
       resetCart: (state) => {
        state.cart = []
        state.totalMoney = 0
        state.totalItems = 0
        // Update to localstorage
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
      },
    }
})

export const{addToCart,removeCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;