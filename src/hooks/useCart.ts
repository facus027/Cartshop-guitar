import {  useState, useEffect, useMemo } from 'react'
import {db} from "../data/db"
import type {Guitar,GuitarItem} from "../types/index"

export const useCart=()=>{

    function initialCart() : GuitarItem[] {
        const localStorageCart=localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart):[];
      }
    
      const [data ] =  useState(db);
      const [cart,setCart] = useState(initialCart);
    
      useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
      },[cart])
    
      function addToCart(item:Guitar){
    
        const itemExist=cart.findIndex(guitar=>guitar.id===item.id);
        if(itemExist>=0){
          const updateCart=[...cart];
          updateCart[itemExist].quantity++;
          setCart(updateCart)
        }else{
          const newItem : GuitarItem= {...item,quantity :1}
          setCart(([...cart,newItem]));
        }
    
      }
    
      function removeCart(id : Guitar['id']) {
        setCart(prevCart=>prevCart.filter(item=>item.id!==id));
      }
    
      function increaseQuantity(id : Guitar['id']){
        const updateCart=cart.map((item)=>{
          if(item.id===id && item.quantity<=4){
            return{
              ...item,
              quantity:item.quantity+1
            }
          }
          return item;
        })
        setCart(updateCart);
      }
    
      function decreaseQuantity(id : Guitar['id']){
        const updateCart=cart.map((item)=>{
          if(item.id===id && item.quantity>=2){
            return{
              ...item,
              quantity:item.quantity-1
            }
          }
          return item;
        })
        setCart(updateCart);
      }
    
      function clearCart(){
        setCart([]);
      }

    //statem derivado
    const isEmpty = useMemo( () =>  cart.length === 0,[cart] );
    const cartTotal=useMemo( () => cart.reduce((total,item) => total + (item.quantity*item.price),0),[cart]);
    

    return{
        data,
        cart,
        addToCart,
        removeCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}