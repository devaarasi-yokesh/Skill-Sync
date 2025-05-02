import { goalStore } from '../store/goal.store';
import { Box,Text,Input, Flex, Popover,Portal,Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';




function ResourceSection() {

const {createResource,resources,getResource} = goalStore();
const [newRes,setNewRes] = useState({ name:'',link:'',completedResources:[]});

useEffect(() => {
   getResource(); 
},[getResource]);

const handleResourceValue = async() =>{
    let temp = {name:newRes.name,link:newRes.link}
    const res = await createResource({resource:temp,completedResources:newRes.completedResources});

    console.log(res,newRes)
    setNewRes({ name:'',link:'',completedResources:[]})
}


  return (
   <Box marginTop='10'>
    
    {/* <Flex flexDirection='column' gap='4.5' marginY='8'>
    <Box>
    <Text>name</Text>
    <Input></Input>
    </Box>

    <Box>
    <Text>link</Text>
    <Input></Input>
    </Box>
    </Flex> */}
    <Flex gap='36'>
    <Text as='h2' fontSize='2xl' color='blue.400'>Resources</Text>
    <Popover.Root>
                
                 <Popover.Trigger  asChild><Text marginTop='0' border='ActiveBorder' rounded='md' background='gray.200' padding='2' fontWeight={'bold'}>Add</Text>
                </Popover.Trigger>
               
                <Portal>
                   <Popover.Positioner>
                      <Popover.Content css={{'--popover-bg':'colors.blue.300'}}>
                         <Popover.Arrow/>
                         <Popover.Body>
                            <Popover.Title css={{'--popover-bg':'colors.black.300'}}>create task</Popover.Title>
                            <Flex flexDir='column' gap='2.5'   marginTop='2.5'>
                               <>
    
                               <Box>
                               <Text htmlFor="task">resource name</Text> &nbsp;
                               <Input type="text" id='task' value={newRes.name} onChange={(ev)=>setNewRes({...newRes,name:ev.target.value})}/> <br/>
                               </Box>
    
                               <Box>
                               <Text htmlFor="deadline">link</Text> &nbsp;
                               <Input type="text" id='deadline' value={newRes.link} onChange={(ev)=>setNewRes({...newRes,link:ev.target.value})}/><br/>
                               </Box>
                               <Button onClick={handleResourceValue}>add</Button>
                               </> 
                               </Flex>
                         </Popover.Body>
                      </Popover.Content>
                   </Popover.Positioner>
                </Portal>
             </Popover.Root>
             </Flex>

             {resources.map((resource)=>{
                console.log(resource.resource)
                return(
                    <>
                   {resource.resource.name}
                    </>
                )
             })}
   </Box>
  )
}

export default ResourceSection
