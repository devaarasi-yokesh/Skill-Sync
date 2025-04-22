import React,{useState,useEffect} from 'react'
import { resourceStore } from '../store/resource.store';
import { IoMdAdd } from "react-icons/io";




const GoalCard = () => {

    const {resources,getResource,updateResource} = resourceStore();
    const [taskName, setTaskName] = useState(null);
    const [task, setTask] = useState({name:"",deadline:""});
    const [addTask, setAddTask] = useState(false);
    const [hideAddButton, setHideAddButton] = useState(true);
    const [addToStack,setAddToStack] = useState(false);
    const [courses, setCourses] = useState([]);
 
useEffect(() => {
   getResource();
   // let result = fetch('/courses.json')
   //  .then((res)=> res.json())
   //  .then((data) => setCourses(data))
   // console.log(result,'res')
},[getResource]);


// const filtered = courses.filter((course)=> course.topic.toLowerCase().includes(resources.goal.toLowerCase()))
// console.log(filtered,'filtered sources')

const updateTaskValue = async({data})=>{
   data.task = [...data.task,task]
  
  
   // temp = {...data,task}
   
   await updateResource(data._id,data)
}

const handleTaskValue = async({data}) =>{
console.log(data.goal)
const res = await updateResource(data._id,task);
console.log(res.message,res.data)
}


  return (
    <>
     {resources.map((data,index)=>{
    return(
    <div className='border-b border-dashed m-5'>
     <h3 className='font-bold text-3xl uppercase m-8 text-gray-400'>{data.goal}</h3>
     <div className='mx-8 my-9'>
     <p className='font-bold text-xl'>Tasks</p>
     <p className='text-lg font-thin my-4' style={{
            color: taskName === index ? "blue" : "black",
            textDecoration: taskName === index ? "underline" : "none",
            cursor: "pointer"
          }}>
       <input type="checkbox" onChange={()=>setTaskName(index)} value={data.task} key={index}/> {data.task ? data.task.map((val)=>{return( val.name)}) : 0}
     </p> 
     {addToStack &&<> <input type='checkbox'></input> {task.name}</>}
     {hideAddButton && <>
     <button onClick={()=>{setAddTask(true);setHideAddButton(false)}}><IoMdAdd /></button> <br/>
     </>}
     {addTask && <>
     <label htmlFor="task">task</label> &nbsp;
     <input type="text" className='border mb-3' id='task' onChange={(e)=> setTask({...task,name:e.target.value})} value={task.name}></input> <br/>
     <label htmlFor="deadline">deadline</label> &nbsp;
     <input type="date" className='border' id='deadline'  onChange={(e)=> setTask({...task,deadline:e.target.value})} value={task.deadline}></input> <br/>
     <button className='border mt-3 px-2 rounded' onClick={()=>updateTaskValue({data})}>add</button>
     </>} <br/>
     {/* <input type='checkbox'></input> &nbsp; */}
     </div>
     
     <div className='mx-8'>
     <p className='font-bold text-xl'>Resources</p>
     <p className='text-lg font-thin my-4'>
        {data.task.name}
     </p>
     </div>
     
    </div>)
   })}
    </>
  )
}

export default GoalCard
