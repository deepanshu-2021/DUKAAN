import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import App from './App.tsx'
const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomeScreen/>}/>
    <Route path='/cart' element={<h1>cart</h1>}/>
    <Route path='/user' element={<h1>user</h1>}/>
    <Route path='/product/:id' element={<ProductScreen/>}/>
  </Route>
)
)
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.tsx'
import ProductScreen from './components/ProductScreen.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
