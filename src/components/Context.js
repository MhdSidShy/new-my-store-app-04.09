import { createContext, useReducer } from "react";

export const CartContext = createContext();

const Context = (props) => {
 const reducer = (state, action) => {
 switch (action.type) {
 case "ADD":
 const tempstate = state.filter(
 (data) => action.payload.id === data?.id
 );
 if (tempstate.length > 0) {
 return state;
 // there are no Quantity I added Quantity
 } else {
 return [...state, { ...action.payload, Quantity: 0}];
 }
 case "INCREASE":
 const tempstate1 = state.map((data) => {
 if (data?.id === action.payload.id) {
 return { ...data, Quantity: data.Quantity + 1 };
 } else {
 return data;
 }
 });
 return tempstate1;
 case "DECREASE":
 const tempstate2 = state.map((data) => {
 if (data?.id === action.payload.id) {
 return { ...data, Quantity: data.Quantity - 1 };
 } else {
 return data;
 }
 });
 return tempstate2;
 case "REMOVE":
 const tempstate3 = state.filter(
 (data) => data?.id !== action.payload.id
 );

 return tempstate3;

 default:
 return state;
 }
 };
 const [state, dispatch] = useReducer(reducer, []);
 const info = { state, dispatch };
 return (
 <CartContext.Provider value={info}>{props.children}</CartContext.Provider>
 );
};

export default Context;
