import { goalStore } from '../store/goal.store';
import { Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Input, 
  VStack, 
  SimpleGrid, 
  Center, 
  IconButton, 
  ButtonGroup,
  Popover, Portal,
  Icon} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { 
  BsPlusCircle, 
  BsLink45Deg, 
  BsBoxArrowUpRight, 
  BsTrash,
  BsFolderX
} from 'react-icons/bs';




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

const deleteResource = () => {
   return
}

  return (

   <Box marginTop="10"  bg="var(--card)" borderRadius="xl" boxShadow="0 4px 6px rgba(0,0,0,0.05)">

  {/* Section Header */}
  <Flex justify="space-between" align="center" mb={8} pb={4} borderBottom="1px solid" borderColor="var(--border)">
    <Heading as="h2" fontSize="2xl" color="var(--primary)" fontWeight="600">
      Resources
    </Heading>
    
    <Popover.Root placement="right-end">
      <Popover.Trigger
          colorScheme="blue"
         variant="outline"
         size="sm"
         px={3}
         fontWeight="600"
         borderRadius="md"
         borderWidth="1.5px"
         _hover={{ bg: "blue.50" }}
         _active={{ transform: "scale(0.98)" }}>
            <Flex flexDir={'row'} align='center' >
               <Icon as={BsPlusCircle} mx={3}/>
               <Text> Add Resource</Text>
            </Flex>
            
      </Popover.Trigger>
      
      <Portal>
        <Popover.Positioner>
          <Popover.Content bg="var(--card)" borderRadius="md">
            <Popover.Arrow bg="var(--card)" />
            <Popover.Header 
              fontWeight="600" 
              fontSize="lg" 
              borderBottom="1px solid" 
              borderColor="var(--border)" 
              p={4}
            >
              Create Resource
            </Popover.Header>
            
            <Popover.Body p={4}>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="500" mb={1} color="var(--secondary)">
                    Resource Name
                  </Text>
                  <Input 
                    type="text"
                    size="sm"
                    borderRadius="md"
                    value={newRes.name}
                    onChange={(ev) => setNewRes({...newRes, name: ev.target.value})}
                  />
                </Box>
                
                <Box>
                  <Text fontWeight="500" mb={1} color="var(--secondary)">
                    Link
                  </Text>
                  <Input 
                    type="text"
                    size="sm"
                    borderRadius="md"
                    value={newRes.link}
                    onChange={(ev) => setNewRes({...newRes, link: ev.target.value})}
                  />
                </Box>
                
                <Button 
                  colorScheme="blue" 
                  size="sm" 
                  mt={2}
                  onClick={handleResourceValue}
                >
                  Add Resource
                </Button>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  </Flex>

  {/* Resources List */}
  {resources.length > 0 ? (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {resources.map((resourceGroup, groupIndex) => (
        resourceGroup.resource.map((res, resIndex) => (
          <Flex 
            key={`${groupIndex}-${resIndex}`}
            bg="var(--background)"
            p={4}
            borderRadius="md"
            align="center"
            border="1px solid"
            borderColor="var(--border)"
            _hover={{ boxShadow: "0 2px 5px rgba(0,0,0,0.08)" }}
          >
            <Icon as={BsLink45Deg} color="var(--primary)" boxSize={5} mr={3} />
            
            <Box flex="1" minW="0">
              <Text 
                fontWeight="500" 
                isTruncated
                color="var(--primary)"
              >
                {res.name || "Untitled Resource"}
              </Text>
              <Text 
                fontSize="sm" 
                color="gray.500" 
                isTruncated
                title={res.link}
              >
                {res.link.replace(/(^\w+:|^)\/\//, '')}
              </Text>
            </Box>
            
            <ButtonGroup size="sm">
              <IconButton 
                icon={<BsBoxArrowUpRight />} 
                aria-label="Open resource"
                variant="ghost"
                onClick={() => window.open(res.link, '_blank')}
              />
              <IconButton 
                icon={<BsTrash />} 
                aria-label="Delete resource"
                variant="ghost"
                colorScheme="red"
                onClick={() => deleteResource(resourceGroup, res)}
              />
            </ButtonGroup>
          </Flex>
        ))
      ))}
    </SimpleGrid>
  ) : (
    <Center py={8} flexDir="column" color="gray.500">
      <Icon as={BsFolderX} boxSize={8} mb={3} />
      <Text fontWeight="500" mb={2}>No Resources Added</Text>
      <Text textAlign="center" maxW="md">
        Add helpful links, documents, or references to support your goals
      </Text>
    </Center>
  )}
   </Box>
  )
}

export default ResourceSection;
