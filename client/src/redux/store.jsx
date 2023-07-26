// import {configureStore} from '@reduxjs/toolkit'
// import productSlice from './productSlice'
// import cartSlice from './cartSlice'

// export const store = configureStore({
//     reducer: {
//         products: productSlice,
//         cart: cartSlice
//     }
// })
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer = combineReducers({ user: userSlice ,cart : cartSlice, products: productSlice });


  const persistedReducer =  persistReducer(persistConfig,rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  export let persistor = persistStore(store);