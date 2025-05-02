import React, { useState } from 'react'
import {goalStore} from '../store/goal.store'
import { nanoid } from 'nanoid'
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';


const CreatePage = () => {

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
      <Heading fontSize='3xl' marginBottom='8' color='blue.400'>Create Goal</Heading>
    <form>
      <Flex flexDirection='column' gap='8'>
      <div>
      < Text  htmlFor="inlinegoal">
        Goal
      </Text>
      <Input onChange={(e) => setNewRes({...newRes,goal:e.target.value})} value={newRes.goal} id="inlinegoal" type="text" placeholder="Python" variant='subtle'/>
    </div>
      <div >
          <Text  htmlFor="inlinetask">
            Initial Task
          </Text>
          <Input onChange={(e)=>handleInput(e)} value={newRes.task.name} variant='subtle' placeholder="Write First Program in Python"/>
        
      </div>
      
      <div >
          <Text htmlFor="inlineDeadline">
            Deadline
          </Text>
          <Input onChange={(e)=>handleInput(e)} value={newRes.task.deadline} variant='subtle' type='date'  placeholder="https://python_beginner_course"/>
    
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
          <Button onClick={handleAdd} w='full'>
            Add
          </Button>
      </div>
      </Flex>
    
</form>
    </div>
  )
}

export default CreatePage
