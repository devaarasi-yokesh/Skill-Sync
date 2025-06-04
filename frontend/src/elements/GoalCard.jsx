import {useState,useEffect, useCallback} from 'react'
import { goalStore } from '../store/goal.store';
import { IoMdAdd } from "react-icons/io";
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Flex, VStack, SimpleGrid,
  Button, ButtonGroup, Badge, Checkbox, Icon,
  Popover,  Portal,Input, AspectRatio, Image,
  Center, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { BsClipboard, BsFileText, BsBook,BsBullseye, BsPlusCircle } from 'react-icons/bs';
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
    const [selectedItem,setSelectedItem] = useState('');
 


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
   
   setTarget(id);
  
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
      {goals.length === 0 ? (
           <Center height="50vh" flexDirection="column">
                  <Icon as={BsBullseye} boxSize={12} color="var(--primary)" mb={4} />

                  <Heading size="lg" mb={3} color="var(--primary)">
                   No Goals Added Yet
                  </Heading>

                  <Text mb={6} color="gray.500" maxW="md" textAlign="center">
                  Start your journey by creating your first goal. Click the button below to begin.
                  </Text>

                  <Button 
                  as={Link} 
                  to='/create'
                  colorScheme="blue" 
                  size="lg"
                  leftIcon={<BsPlusCircle />}
                  >
                  Create New Goal
                  </Button>
          </Center>
      ):( goals.map((data, index) => {
         

         return(

               <Box key={index} bg="var(--card)"
                  borderRadius="xl"
                  boxShadow="0 4px 6px rgba(0,0,0,0.05)"
                  p={6}
                  mb={8}
                  position="relative">

                     {/* Goal Header */}
                     <Heading 
                     fontSize="2xl" 
                     textTransform="uppercase" 
                     textAlign="center" 
                     color="var(--primary)"
                     fontWeight="600"
                     pb={4}
                     mb={6}
                     borderBottom="1px solid"
                     borderColor="var(--border)"
                     >
                     {data.goal}
                     </Heading>

                     {/* Tasks Section */}
                     <Box mb={8}>
                     <Flex justify="space-between" align="center" mb={6} pb={4} borderBottom="1px solid" borderColor="var(--border)">

                        <Heading fontSize="xl" color="var(--primary)" fontWeight="600">Tasks</Heading>

                         <Popover.Root placement="right-end">
                           <Popover.Anchor>
                              <Popover.Trigger
                                       colorScheme="blue"
                                       variant="outline"
                                       size="sm"
                                       px={6}
                                       leftIcon={<BsPlusCircle size={14} />}
                                       fontWeight="600"
                                       borderRadius="md"
                                       borderWidth="1.5px"
                                       _hover={{ bg: "blue.50" }}
                                       _active={{ transform: "scale(0.98)" }}
                                       >
                                       Add Task
                              </Popover.Trigger>
                           </Popover.Anchor>

                           <Portal>
                           <Popover.Positioner>
                              <Popover.Content bg="white" 
                                 borderRadius="lg" 
                                 boxShadow="0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
                                 border="1px solid"
                                 borderColor="gray.200"  zIndex="popover">
                                 <Popover.Arrow fill="white"/>

                                 <Popover.Header fontWeight="600" 
                                    fontSize="lg" 
                                    px={4} 
                                    py={3}
                                    borderBottom="1px solid"
                                    borderColor="gray.100"
                                    bg="gray.50"
                                    borderTopRadius="lg">Create New Task</Popover.Header>

                                 <Popover.Body px={4} py={5}>
                                    <VStack spacing={4} align="stretch">

                                       <Text >Task Name</Text>
                                       <Input 
                                             type="text"
                                             size="sm"
                                             borderRadius="md"
                                             borderColor="gray.300"
                                             _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                                             value={task.name}
                                             onChange={(e) => setTask({...task, name: e.target.value})}
                                             placeholder="Enter task name"/>

                                       <Text>Deadline</Text>
                                       <Input 
                                          type="date"
                                          size="sm"
                                          borderRadius="md"
                                          borderColor="gray.300"
                                          _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                                          value={task.deadline}
                                          onChange={(e) => setTask({...task, deadline: e.target.value})} />

                                       <Button 
                                             colorScheme="blue"
                                             size="sm"
                                             fontWeight="600"
                                             mt={2}
                                             py={2}
                                             onClick={() => updateTaskValue({data})}
                                             _hover={{ transform: "translateY(-1px)" }}
                                             _active={{ transform: "translateY(0)" }}> Add Task
                                       </Button>

                                    </VStack>
                                 </Popover.Body>

                              </Popover.Content>
                           </Popover.Positioner>
                           </Portal>
                        </Popover.Root> 


                     </Flex>

                     <VStack spacing={3} align="stretch">
                              {data.task && data.task.length > 0 ? 
                                 data.task.map((val, i) => {

                                 return(
                                     
                                     <Flex 
                                       key={`${data._id}-${i}`}
                                       align="center"
                                       p={3}
                                       bg="var(--background)"
                                       borderRadius="md"
                                       _hover={{ bg: "rgba(67, 97, 238, 0.05)" }}>

                                    
                                    <Checkbox.Root defaultChecked variant='outline' colorScheme="blue"
                                       mr={3} onChange={() => deleteTaskValue(data, val)}>
                                       <Checkbox.HiddenInput />
                                       <Checkbox.Control />
                                       <Checkbox.Label></Checkbox.Label>
                                    </Checkbox.Root>

                                    <Box flex="1">

                                       <Text fontWeight="500">{val.name || 'Untitled task'}</Text>

                                       <Text fontSize="sm" color="gray.500">

                                           Deadline: {val.deadline ? new Date(val.deadline).toLocaleDateString() : 'No deadline'}

                                       </Text>
                                    

                                    </Box>
                              </Flex>
                                 )}
                             

                           )  : (

                           <Center py={4} flexDir="column">

                              <Icon as={BsClipboard} boxSize={8} color="gray.300" mb={2} />

                              <Text color="gray.500">No tasks yet</Text>

                           </Center>
                           )
                        }

                     </VStack>

                     </Box>

                     {/* Resources Section */}
                     <ResourceSection />

                     {/* Recommended Resources */}
                     <Box mt={8}>

                        <Heading color="var(--primary)" mb={6} fontSize="xl" fontWeight="600">
                           Recommended Resources
                        </Heading>

                        {/* Articles */}
                        <Box mb={8}>
                              <Flex align="center" mb={4}>

                                 <Heading fontSize="lg" color="var(--secondary)" fontWeight="600">
                                 Articles
                                 </Heading>

                                 <Badge ml={2} colorScheme="blue" borderRadius="full">
                                 {articles.flat().length}
                                 </Badge>

                              </Flex>
                     
                              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>

                                 {articles.flat().slice(0, 2).map((val, i) => (
                                 
                                    <Flex 
                                    key={i}
                                    p={4}
                                    bg="var(--background)"
                                    borderRadius="md"
                                    align="center">
                                       <Icon as={BsFileText} color="var(--primary)" mr={3} />

                                       <Text flex="1" fontWeight="500" color={checkCompleted && selectedItem === i ? 'green.500' : 'inherit'}>
                                          {val}
                                       </Text>

                                       <ButtonGroup size="sm">

                                          <Button variant="outline" colorScheme="blue">Add</Button>

                                          <Button variant="outline" colorScheme="red">Remove</Button>

                                          {/* <Button variant={checkCompleted && selectedItem === i ? "solid" : "outline"} 
                                          colorScheme={checkCompleted && selectedItem === i ? "green" : "gray"}
                                          onClick={() => {setCompleted(true); setSelectedItem(i)}}>
                                          {checkCompleted && selectedItem === i ? "Completed" : "Complete"}
                                          </Button> */}
                                          
                                       </ButtonGroup>
                                 </Flex>
                                 ))}

                              </SimpleGrid>

                        </Box>

                        {/* Videos */}
                        <Box mb={8}>

                           <Heading fontSize="lg" color="var(--secondary)" mb={4} fontWeight="600">
                              Videos
                           </Heading>
                           
                           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                              {videos.flat().slice(0, 2).map((val, i) => (
                              <Box 
                                 key={i}
                                 border="1px solid"
                                 borderColor="var(--border)"
                                 borderRadius="md"
                                 overflow="hidden"
                              >
                                 <AspectRatio ratio={16/9}>
                                    <Image 
                                    src={val[1]} 
                                    alt={val[0]} 
                                    objectFit="cover"
                                    />
                                 </AspectRatio>
                                 <Box p={4}>
                                    <Text fontWeight="500" mb={3}>{val[0]}</Text>
                                    <ButtonGroup size="sm">
                                    <Button variant="outline" colorScheme="blue">Add</Button>
                                    <Button variant="outline" colorScheme="red">Remove</Button>
                                    </ButtonGroup>
                                 </Box>
                              </Box>
                              ))}
                           </SimpleGrid>
                        </Box>

                        {/* Courses */}
                        <Box>
                           <Heading fontSize="lg" color="var(--secondary)" mb={4} fontWeight="600">
                              Courses
                           </Heading>
                           
                           <VStack spacing={3} align="stretch">
                              {courses.flat().slice(0, 3).map((val, i) => (
                              <Flex 
                                 key={i}
                                 p={4}
                                 bg="var(--background)"
                                 borderRadius="md"
                                 align="center"
                              >
                                 <Icon as={BsBook} color="var(--primary)" mr={3} />
                                 <Text flex="1" fontWeight="500">{val}</Text>
                                 <ButtonGroup size="sm">
                                    <Button variant="outline" colorScheme="blue">Add</Button>
                                    <Button variant="outline" colorScheme="red">Remove</Button>
                                 </ButtonGroup>
                              </Flex>
                              ))}
                           </VStack>
                        </Box>
                     </Box>
               </Box>

         )}))}
      </>
  )
}

export default GoalCard
