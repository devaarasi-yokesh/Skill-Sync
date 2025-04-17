import React, { useEffect } from 'react'
import { resourceStore } from '../store/resource.store'


const Goals = () => {
    const {resources,getResource} = resourceStore();
 
useEffect(() => {
   getResource()
},[getResource]);


  return (
   <>
   {resources.map((data)=>{
    return(
    <div className='border-b border-dashed m-5'>
     <h3 className='font-bold text-3xl uppercase text-center m-8 text-gray-400'>{data.goal}</h3>
     <div className='mx-8'>
     <p className='font-bold text-xl'>Tasks</p>
     <p className='text-lg font-thin my-4'>
        {data.task}
     </p>
     </div>
     
     <div className='mx-8'>
     <p className='font-bold text-xl'>Resources</p>
     <p className='text-lg font-thin my-4'>
        {data.task}
     </p>
     </div>
     
    </div>)
   })}
   </>
  )
}

export default Goals
