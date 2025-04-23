import React,{useState,useEffect} from 'react'
import { resourceStore } from '../store/resource.store';
import { IoMdAdd } from "react-icons/io";
import { nanoid } from 'nanoid';




const GoalCard = () => {

    const {resources,getResource,updateResource,deleteResource} = resourceStore();
    const [task, setTask] = useState({name:"",deadline:"",id:""});
    const [addTask, setAddTask] = useState(false);
    const [hideAddButton, setHideAddButton] = useState(true);
    const [goalId, setGoalId] = useState(null);
    const [target, setTarget] = useState(null);
 

useEffect(() => {
   getResource(); 
  
},[getResource]);



const updateTaskValue = async({data})=>{
   console.log(nanoid())
   let temp = {...task,id:nanoid()};
   setTask(temp)
   data.task = [...data.task,temp]
   console.log(data.task,task,temp)
  
  
   setAddTask(false);
   setHideAddButton(true);

   await updateResource(data._id,data)
   setTask({
      name:"",
      deadline:"",
      id:"",
   });
   
}


const toggleTask = (id) => {
   
   setAddTask(true);
   setHideAddButton(false);
   
   setTarget(id
)
  ;
  console.log(id,target)
}


const deleteTaskValue = async(data,val) => {
   data.task = data.task.filter((task) => task.name !== val.name  );
   data.completedTasks = [...data.completedTasks,val]
   
   console.log(data,"Testing here")
   const response = await updateResource(data._id,data);
   console.log(response.message,response.data)
   if(!response.data.task){
      await deleteResource(data._id)
   }
}

  return (
    <>
     {resources.map((data,index)=>{
     
    return(
   
     <div className='border-b border-dashed m-5'>
     <h3 className='font-bold text-3xl uppercase m-8 text-gray-400'>{data.goal}</h3>
     <div className='mx-8 my-9'>
     <p className='font-bold text-xl'>Tasks</p>

     {data.task ? data.task.map((val,i)=> {
      return(
         <>
         <p className='text-lg font-thin my-4' key={val.id}>
         <input type="checkbox" onChange={()=>deleteTaskValue(data,val)} key={i}/> {val.name ? val.name : 'No tasks'}
         </p> 
         </>
      )
     }) : 'No tasks added'}
     
     {hideAddButton && <>
     <button onClick={()=>toggleTask(data._id)}><IoMdAdd /></button> <br/>
     </>}

   
      {addTask &&  (target === data._id) ? (<>
      <label htmlFor="task">task</label> &nbsp;
      <input type="text" className='border mb-3' id='task' onChange={(e)=> setTask({...task,name:e.target.value})} value={task.name}></input> <br/>
      <label htmlFor="deadline">deadline</label> &nbsp;
      <input type="date" className='border' id='deadline'  onChange={(e)=> setTask({...task,deadline:e.target.value})} value={task.deadline}></input> <br/>
      <button className='border mt-3 px-2 rounded' onClick={()=>updateTaskValue({data})}>add</button>
      </>) : ''} 

     
     
     </div>
     
     <div className='mx-8'>
     <p className='font-bold text-xl'>Resources</p>
     <p className='text-lg font-thin my-4'>
       resource
     </p>
     </div>
     
    </div>)
   })}
    </>
  )
}

export default GoalCard
