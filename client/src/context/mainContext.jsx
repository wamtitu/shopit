import { createContext, useEffect, useReducer } from "react";

const Reducer = (state, action)=> {
    switch(action.type){
        case "DASHBOARD": 
          return{
            main: action.payload
          }
          case "ORDERS": 
          return{
            main: action.payload
          }
          case "USERS": 
          return{
            main: action.payload
          }
          case "PRODUCTS": 
          return{
            main: action.payload
          }
          case "ANALYTICS": 
          return{
            main: action.payload
          }
    }
};
 const Initial_State = {
    main : JSON.parse(localStorage.getItem("main")) || 'dashboard'
 }

 //create context
 export const Context = createContext(Initial_State);

 //context provider
 export const MainContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, Initial_State)

    useEffect(()=>{
        localStorage.setItem('main', JSON.stringify(state.main))
    }, [state.main]);
    return <Context.Provider value = {{main :state.main, dispatch}}>
        {children}
    </Context.Provider>
 }