import React, { useState } from 'react'
import {goalStore} from '../store/goal.store'
import { nanoid } from 'nanoid'
import { useEffect } from 'react';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';


const CreatePage = () => {

// Somewhere in your component
useEffect(() => {
  throw new Error("Test Sentry Error");
}, []);


const [newRes, setNewRes] = useState({
  goal:"",
  task:{
    name:"",
    deadline:"",
    id:"",
  },
  completedTasks:[],
});



const {createGoal, goals} = goalStore();


const handleInput = (e) =>{
  if(e.target.type !== 'date'){
    newRes.task.name = e.target.value;
    newRes.task.id = nanoid();
    setNewRes({...newRes})
  }
  else{
    newRes.task.deadline = e.target.value;
    setNewRes({...newRes})
  }
  
}


const handleAdd = async() => {
  console.log(newRes)
 const data = await createGoal(newRes);
 console.log(data.message)
 
 setNewRes({
  goal:"",
  task:{
    name:"",
    deadline:"",
    id:""
  },
  completedTasks:[],
 })
}

  return (
    <div className='mt-9'>
      <Heading fontSize='3xl' marginBottom='8' color='blue.400' className='createPageHeading'>Create Goal</Heading>
    <form>
      <Flex flexDirection='column' gap='8'>
      <div>
      < Text  htmlFor="goalName">
        Goal
      </Text>
      <Input onChange={(e) => setNewRes({...newRes,goal:e.target.value})} value={newRes.goal} name="goalName" type="text" placeholder="Python" variant='subtle'/>
    </div>
      <div >
          <Text  htmlFor="inlinetask">
            Initial Task
          </Text>
          <Input onChange={(e)=>handleInput(e)} value={newRes.task.name} name='taskName' variant='subtle' placeholder="Write First Program in Python"/>
        
      </div>
      
      <div >
          <Text htmlFor="inlineDeadline">
            Deadline
          </Text>
          <Input onChange={(e)=>handleInput(e)} value={newRes.task.deadline} name='deadline' variant='subtle' type='date'  placeholder="https://python_beginner_course"/>
    
      </div>

      {/* <div >
        <Text >
          <Input type="checkbox"/>
          <span className="text-sm">
            Recommend me resources!
          </span>
        </Text>
      </div> */}

      <div>
          <Button onClick={handleAdd} w='full' className='addButton'>
            Add
          </Button>
      </div>
      </Flex>
    
</form>
    </div>
  )
}

export default CreatePage
