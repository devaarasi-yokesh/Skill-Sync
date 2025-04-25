import React,{useState,useEffect} from 'react'
import { resourceStore } from '../store/resource.store';
import { IoMdAdd } from "react-icons/io";
import { nanoid } from 'nanoid';
import { Button, Heading, Box, Text,Input, Flex, Image } from '@chakra-ui/react';
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
}

  return (
    <>
     {resources.map((data,index)=>{
     
    return(
   
     <div className='border-b border-dashed m-5'>
      <Heading fontSize='2xl' textTransform='uppercase' textAlign='center' color='blue.400'>
        {data.goal}
      </Heading>

     
      <Box>
      <div className='mx-8 my-9'>
      <Heading fontSize='xl' color='blue.400'>Tasks</Heading>

         <Box marginTop='4.5'>
            {data.task ? data.task.map((val,i)=> {
            return(
               <>
               <Text key={val.id} color='gray.400'>
               <input type="checkbox" onChange={()=>deleteTaskValue(data,val)} key={i}/> {val.name ? val.name : 'No tasks'}
               </Text> 
               </>
            )
            }) : 'No tasks added'}
         </Box>
         
         <Box marginTop='2.5'>
         {hideAddButton && <>
         <button onClick={()=>toggleTask(data._id)}><IoMdAdd /></button> <br/>
         </>}
         </Box>
         

         <Flex flexDir='column' gap='2.5'   marginTop='2.5'>
         {addTask &&  (target === data._id) ? (<>
         <Box>
         <Text htmlFor="task">task</Text> &nbsp;
         <Input type="text" id='task' onChange={(e)=> setTask({...task,name:e.target.value})} value={task.name}/> <br/>
         </Box>
         <Box>
         <Text htmlFor="deadline">deadline</Text> &nbsp;
         <Input type="date" id='deadline'  onChange={(e)=> setTask({...task,deadline:e.target.value})} value={task.deadline}/><br/>
         </Box>
         <Button onClick={()=>updateTaskValue({data})}>add</Button>
         </>) : ''} 
         </Flex>
        
         </div>
      </Box>

      <Flex flexDirection='column' gap='4.5'>
      <Heading color='blue.400'>Recommended Resources</Heading>
      <Box>
      <Heading>Articles</Heading>
      
      {articles.map((a)=>{
         return(
            <>
            <Text fontSize='large' margin='2'> {a}</Text>
            
            </>
         )
      })}
      </Box>

     <Box>
     <Heading>Videos</Heading>
         {videos.map((a)=>{
            return(
               <Box margin='2'>
               <Text marginTop='2.5'> {a[0]}</Text>
               <Image src={a[1]} alt=""  marginTop='2.5'/>
               </Box>
            )
         })}
     </Box>
        
     <Button onClick={()=>showArticle(data)}>show</Button>
      </Flex>
    </div>)
   })}
   
    </>
  )
}

export default GoalCard
