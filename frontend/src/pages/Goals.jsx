import React, { useEffect, useState } from 'react'
import GoalCard from '../elements/GoalCard';
import { Center, Heading } from '@chakra-ui/react';


const Goals = () => {
 

  return (
   <>
   {/* <Center><Heading fontSize='3xl'>Goals</Heading></Center> */}
   
   <GoalCard/>
   </>
  )
}

export default Goals
