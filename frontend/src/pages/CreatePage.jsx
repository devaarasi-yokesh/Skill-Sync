import React, { useState } from 'react'
import {goalStore} from '../store/goal.store'
import { nanoid } from 'nanoid'
import { useEffect } from 'react';
import { Heading, 
  Flex, 
  Input, 
  Button  } from '@chakra-ui/react';


const CreatePage = () => {

// Somewhere in your component
// useEffect(() => {
//   throw new Error("Test Sentry Error");
// }, []);


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
    <div className='mt-9 max-w-2xl mx-auto'>
  <Heading 
    fontSize='3xl' 
    marginBottom='8' 
    color='var(--primary)'
    fontWeight='600'
    textAlign='center'
    className='createPageHeading'
  >
    Create New Goal
  </Heading>

  <form>
    <Flex flexDirection='column' gap='6'>
      {/* Goal Name Field */}
      
        <label
          htmlFor="goalName" 
          color='var(--text-medium)'
          fontWeight='500'
          mb='2'
        >
          Goal Name
        </label>
        <Input 
          onChange={(e) => setNewRes({...newRes, goal: e.target.value})} 
          value={newRes.goal} 
          id="goalName" 
          type="text" 
          placeholder="Learn Python Programming" 
          variant='filled'
          bg='var(--background)'
          _focus={{ borderColor: 'var(--primary)', bg: 'white' }}
          size='lg'
        />
      

      {/* Initial Task Field */}
        <label 
          htmlFor="taskName" 
          color='var(--text-medium)'
          fontWeight='500'
          mb='2'
        >
          First Task
        </label>
        <Input 
          onChange={handleInput} 
          value={newRes.task.name} 
          id="taskName" 
          variant='filled'
          bg='var(--background)'
          _focus={{ borderColor: 'var(--primary)', bg: 'white' }}
          placeholder="Write your first Python program"
          size='lg'
        />

      {/* Deadline Field */}
      
        <label 
          htmlFor="deadline" 
          color='var(--text-medium)'
          fontWeight='500'
          mb='2'
        >
          Deadline
        </label>
        <Input 
          onChange={handleInput} 
          value={newRes.task.deadline} 
          id="deadline" 
          variant='filled'
          bg='var(--background)'
          _focus={{ borderColor: 'var(--primary)', bg: 'white' }}
          type='date' 
          size='lg'
        />
      

      {/* Add Button */}
      <Button 
        onClick={handleAdd} 
        w='full' 
        mt='4'
        bg='var(--primary)'
        color='white'
        _hover={{ bg: 'var(--secondary)', transform: 'translateY(-2px)' }}
        _active={{ transform: 'scale(0.98)' }}
        size='lg'
        fontSize='lg'
        py='6'
        borderRadius='10px'
        boxShadow='0 4px 12px rgba(67, 97, 238, 0.25)'
        className='addButton'
      >
        Create Goal
      </Button>
    </Flex>
  </form>
</div>
  )
}

export default CreatePage

