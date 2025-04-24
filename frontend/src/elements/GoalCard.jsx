import React,{useState,useEffect} from 'react'
import { resourceStore } from '../store/resource.store';
import { IoMdAdd } from "react-icons/io";
import { nanoid } from 'nanoid';
import { Button } from '@chakra-ui/react';
import { data } from 'react-router-dom';




const GoalCard = () => {

    const {resources,getResource,updateResource,deleteResource,getArticle,getVideo,createGoal,getCourse} = resourceStore();
    const [task, setTask] = useState({name:"",deadline:"",id:""});
    const [addTask, setAddTask] = useState(false);
    const [hideAddButton, setHideAddButton] = useState(true);
    const [goalId, setGoalId] = useState(null);
    const [target, setTarget] = useState(null);
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
 

useEffect(() => {
   getResource(); 
  
},[resources,getResource]);

const showArticle = async(data) =>{
   console.log(data)
   const article = await getArticle(data.goal);
   const articleValues = article.data.map((v)=>v.title);
   setArticles(articleValues);
   console.log(articles)
   console.log(article.data.map((v)=>v.title))
   const video = await getVideo(data.goal);
   const videoValues = video.data.items.map((item)=>[item.snippet.title,item.snippet.thumbnails.default.url]);
   setVideos(videoValues);
   console.log(video.data.items.map((item)=>[item.snippet.title,item.snippet.thumbnails.default.url]))
   const course = await getCourse(data.goal);
   console.log(course)
}


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
   console.log(response.message,resources)

   const updatedResources = await Promise.all(resources.map(async(item)=> {
      if(item._id === data._id){
         if(item.task.length === 0){
           const newG =  await createGoal({goal:data.goal,id:data._id})
           const newVal = await deleteResource(data._id)
           console.log(newG)
           console.log(newVal.message)
         }
         console.log(data._id)
         
         
      }
   }));

   console.log(updatedResources)
   // if(!response.data.task){
   //    await deleteResource(data._id)
   // }
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
      <h2>Articles</h2>
     <p className='font-bold text-xl'>Resources</p>
     {articles.map((a)=>{
      return(
         <>
         <p> {a}</p>
        
         </>
      )
     })}
    <h2>Videos</h2>
    {videos.map((a)=>{
      return(
         <>
         <p> {a}</p>
         <img src={a[1]} alt="" />
         </>
      )
     })}
     </div>
     <Button onClick={()=>showArticle(data)}>show</Button>
    </div>)
   })}
   
    </>
  )
}

export default GoalCard
