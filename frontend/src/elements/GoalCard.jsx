import React,{useState,useEffect, useCallback} from 'react'
import { goalStore } from '../store/goal.store';
import { IoMdAdd } from "react-icons/io";
import { nanoid } from 'nanoid';
import { Button, Heading, Box, Text,Input, Flex, Image, Popover, Portal } from '@chakra-ui/react';
import ResourceSection from './ResourceSection';





const GoalCard = () => {

    const {goals,getGoal,updateGoal,deleteGoal,getArticle,getVideo,createCompletedGoal,getCourse} = goalStore();
    const [task, setTask] = useState({name:"",deadline:"",id:""});
    const [addTask, setAddTask] = useState(false);
    const [hideAddButton, setHideAddButton] = useState(true);
    const [goalId, setGoalId] = useState(null);
    const [target, setTarget] = useState(null);
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [goalName, setGoalName] = useState('');
    const [checkCompleted,setCompleted] = useState(false);
    const [selctedItem,setSelectedItem] = useState('');
 


    const showArticle = useCallback(async() =>{
      
      const rs = await getGoal();
      const goals = rs.data;
      console.log(goals)
      const goalNames = goals.map(async(d)=>{
        

         const val =  d.goal.toLowerCase();
         const article = await getArticle(val);
      
      const articleValues = article ? await Promise.all(article.data.map((v)=> v.title)):'no article retrieved';
      setArticles([...articles,articleValues]);
      });
      
      goals.map(async(d)=>{
         const val =  d.goal.toLowerCase();
         console.log(val)
         const video = await getVideo(val);
         const videoValues = video.data.items.map((item)=>[item.snippet.title,item.snippet.thumbnails.default.url]);
         setVideos([...videos,videoValues]);
         
      console.log(video.data.items.map((item)=>[item.snippet.title,item.snippet.thumbnails.default.url]))
      })
      
      const res = await fetch('http://localhost:3000/api/orgs');
      const data = await res.json();
      const courseValues = data.elements.map((val)=>val.name);
      setCourses([...courses,courseValues])
      console.log(data.elements.map((val)=>val.name),courseValues)
   
   },[goalName])

useEffect(() => {
   getGoal(); 
   showArticle();
},[getGoal]);




const updateTaskValue = async({data})=>{

   if(!task.name && !task.deadline){
      alert('Please fill the required fields')
   }

   else{
   let temp = {...task,id:nanoid()};
   setTask(temp)
   data.task = [...data.task,temp]
  
   setAddTask(false);
   setHideAddButton(true);

   const res = await updateGoal(data._id,data)

   setTask({
      name:"",
      deadline:"",
      id:"",
   });
   }
   
   
}


const toggleTask = (id) => {
   
   setAddTask(true);
   setHideAddButton(false);
   
   setTarget(id
)
  ;
}


const deleteTaskValue = async(data,val) => {
   data.task = data.task.filter((task) => task.name !== val.name  );
   data.completedTasks = [...data.completedTasks,val]
   
   console.log(data,"Testing here")
   const response = await updateGoal(data._id,data);
   console.log(response.message,goals)

   const updatedgoals = await Promise.all(goals.map(async(item)=> {
      if(item._id === data._id){
         if(item.task.length === 0){
           const newG =  await createCompletedGoal({goal:data.goal,id:data._id})
           const newVal = await deleteGoal(data._id)
           console.log(newG)
           console.log(newVal.message)
         }
         console.log(data._id)
         
         
      }
   }));

   console.log(updatedgoals)
}



  return (
    <>
     {goals.map((data,index)=>{
   
    return(
   
     <div className='border-b border-dashed m-5'>
      <Heading fontSize='2xl' textTransform='uppercase' textAlign='center' color='blue.400'>
        {data.goal}
      </Heading>

     
      <Box>
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
         
         <Popover.Root positioning={{ placement:'right-end'}}>
            
             <Popover.Trigger onClick={()=>toggleTask(data._id)} asChild><IoMdAdd />
            </Popover.Trigger>
           
            <Portal>
               <Popover.Positioner>
                  <Popover.Content css={{'--popover-bg':'colors.blue.300'}}>
                     <Popover.Arrow/>
                     <Popover.Body>
                        <Popover.Title css={{'--popover-bg':'colors.black.300'}}>create task</Popover.Title>
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
                           <Button onClick={()=>{updateTaskValue({data})}}>add</Button>
                           </>) : ''} 
                           </Flex>
                     </Popover.Body>
                  </Popover.Content>
               </Popover.Positioner>
            </Portal>
         </Popover.Root>
      </Box>

      <ResourceSection/>

      <Flex flexDirection='column' gap='4.5' marginTop={'8'}>
      <Heading color='blue.400'>Recommended resources</Heading>
      <Box>
      <Heading>Articles</Heading>
      
      {articles.map((a)=>{
         return(
           
            <>
             {a.map((val,i) => {
               return(
                  <Flex gap={'8'} flexDir={'row'}>
               
                  <Text fontSize='large' marginY='4.5' color={checkCompleted && selctedItem === i ? 'green.400' : 'gray.800'} key={i}> {val}</Text>
                  <Text  margin={4.5} rounded={'md'} borderWidth={'1px'} padding={'2px'} onClick={()=>{setCompleted(true);setSelectedItem(i)}} cursor={'pointer'}>Complete</Text>
                  </Flex>
               )
             })}
            
            </>
         )
      })}
      </Box>

     <Box>
     <Heading>Videos</Heading>
         {videos.map((a)=>{
            return(
               <>
                  {a.map((val,i) => {
                  return(
                     <>
               
               <Box margin='2'>
               <Text marginTop='2.5'> {val[0]}</Text>
               <Image src={val[1]} alt=""  marginTop='2.5'/>
               </Box>
                     </>
                  )
                })}
               </>
               
               
              
            )
         })}
     </Box>

     <Box>
     <Heading>Courses</Heading>
         {courses.map((a,i)=>{
            return(
               <>
                 {a.map((b)=>{
                  return(
                     <Text>{b}</Text>
                  )
                 })}
                  
               </>
               
               
              
            )
         })}
     </Box>
      </Flex>
    </div>)
   })}
   
    </>
  )
}

export default GoalCard
