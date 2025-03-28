import React, { useState } from 'react'
import axios from 'axios';

function Update({setShowUpdate, showUpdate}) {
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
  return (
    <div className='flex flex-col gap-5   border text-white border-1 rounded-xl p-10'>
        <div className='text-2xl flex justify-center '>Enter Details</div>
        <input
        onChange={(e)=>{
            setName(e.target.value)
        }} type="text" placeholder='Update Car Name' className='border-1 p-3 rounded-xl'/>
        <input
        onChange={(e)=>{
            setPrice(e.target.value)
        }}
        type="text" placeholder='Update Price' className='border-1 p-3 rounded-xl'/>
        <div className='flex justify-center rounded-xl items-center'>
            <button onClick={async ()=>{
                const res = await axios.put(`https://crud-assign-1.onrender.com/update?id=${showUpdate}`,{
                    carName : name,
                    price  
                })
                setShowUpdate("");
            }} className='bg-neutral-700 rounded-xl hover:bg-neutral-600 cursor-pointer p-2'>Submit</button>
        </div>
      </div>
  )
}

export default Update

