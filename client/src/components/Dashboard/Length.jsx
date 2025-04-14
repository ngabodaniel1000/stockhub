import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Length() {
    const [productlength,Setproductlength] = useState([])
    const [outofstocklength,Setoutofstocklength] = useState([])
    const [categorylength,Setcategorylength] = useState([])
    const [orderlength,Setorderlength] = useState([])
    const [error,setError] = useState("")
    const fetchproductlength = async()=>{
        try {
          const response = await axios.get("http://localhost:8889/api/dashboard/length",{withCredentials:true})  
            Setproductlength(response.data.productlength)
            Setcategorylength(response.data.categorylength)
            Setoutofstocklength(response.data.outofstocklength)
            Setorderlength(response.data.orderslength)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(()=>{
    fetchproductlength()
    },[])
  return (
    <div className='grid grid-1 lg:grid-cols-4 md:grid-cols-2 gap-5'>
        <div className='bg-green-500 hover:bg-green-900 w-[200px] flex flex-col justify-center item-center h-20 rounded-md'>
            <h2 className='text-white text-center'>All products</h2>
            <h1 className='text-white text-center'>{productlength.length}</h1>
        </div>
        <div className='bg-blue-500 hover:bg-blue-900 w-[200px] flex flex-col justify-center item-center h-20 rounded-md'>
            <h2 className='text-white text-center'>All Categories</h2>
            <h1 className='text-white text-center'>{categorylength.length}</h1>
        </div>
        <div className='bg-red-500 hover:bg-red-700 w-[200px] flex flex-col justify-center item-center h-20 rounded-md'>
            <h2 className='text-white text-center'>Out of stock</h2>
            <h1 className='text-white text-center'>{outofstocklength.length}</h1>
        </div>
        <div className='bg-gray-500 hover:bg-gray-800 w-[200px] flex flex-col justify-center item-center h-20 rounded-md'>
            <h2 className='text-white text-center'>Orders</h2>
            <h1 className='text-white text-center'>{orderlength.length}</h1>
        </div>
    </div>
  )
}

export default Length