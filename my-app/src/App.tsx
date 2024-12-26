import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {fetchCities} from "./api/cityApi"
import {Layout} from "./LayoutArea/Layout/Layout"
function App() {

  async function getAllCities(){
      let data = await fetchCities();
      console.log(data); 
  }

  useEffect(()=>{
    getAllCities();
  },[])

  return (
    <>
      <div>
            <Layout />

       </div>
    </>
  )
}

export default App
