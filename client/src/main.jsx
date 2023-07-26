import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { getTotals } from './redux/cartSlice.jsx'
import { MainContextProvider } from './context/mainContext.jsx'

store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </Provider>
  </React.StrictMode>,
)
