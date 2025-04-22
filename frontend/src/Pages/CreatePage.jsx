import React, { useState } from 'react'
import {resourceStore} from '../store/resource.store'



const CreatePage = () => {

const [newRes, setNewRes] = useState({
  goal:"",
  task:{
    name:"",
    deadline:""
  },
  completedTasks:0,
});



const {createResource, resources} = resourceStore();


const handleInput = (e) =>{
  if(e.target.type !== 'date'){
    let temp = newRes.task;
    temp.name = e.target.value;
    setNewRes({...newRes,temp})
  }
  else{
    let temp = newRes.task;
    temp.deadline = e.target.value;
    setNewRes({...newRes,temp})
  }
  
}


const handleAdd = async() => {
  console.log(newRes)
 const data = await createResource(newRes);
 console.log(data.message)
 
 setNewRes({
  goal:"",
  task:{
    name:"",
    deadline:""
  },
  completedTasks:0,
 })
}

  return (
    <div className='mt-9'>
    <form className="w-full max-w-sm">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      < label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        Learning Goal
      </label>
    </div>
    <div className="md:w-2/3">
      <input onChange={(e) => setNewRes({...newRes,goal:e.target.value})} value={newRes.goal} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Python"/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Initial Task
      </label>
    </div>
    <div className="md:w-2/3">
      <input onChange={(e)=>handleInput(e)} value={newRes.task.name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"   placeholder="https://python_beginner_course"/>
    </div >
  </div>
  
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Task Deadline
      </label>
    </div>
    <div className="md:w-2/3">
      <input onChange={(e)=>handleInput(e)} value={newRes.task.deadline} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='date'  placeholder="https://python_beginner_course"/>
    </div >
  </div>

  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3"></div>
    <label className="md:w-2/3 block text-gray-500 font-bold">
      <input  className="mr-2 leading-tight" type="checkbox"/>
      <span className="text-sm">
        Recommend me resources!
      </span>
    </label>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button onClick={handleAdd} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Add
      </button>
    </div>
  </div>
</form>
    </div>
  )
}

export default CreatePage
