import React, { useEffect } from 'react';
import { data, Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
  ArcElement,
} from 'chart.js';
import {Bar, Doughnut} from 'react-chartjs-2'
import { useState } from 'react';
import {Flex, Box, Button, Heading, Text, Center, 
  Badge, VStack, Icon, Spinner, ButtonGroup } from '@chakra-ui/react';
import { isBefore, isToday, isTomorrow, compareAsc, parseISO } from 'date-fns';
import { goalStore } from '../store/goal.store';
import { BsCalendar, BsCalendar2Check } from 'react-icons/bs';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);



const HomePage = () => {

  //Global Store
  const { goals,getGoal,getResource,resources} = goalStore(); 

  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [bChart, setBChart] = useState(false);
  const [dChart, setDChart] = useState(false);

  useEffect(() => {
      getGoal();                       // Updated goals
      getResource();                   // Updated resources
      updateUpcomingTasks();
  },[getGoal]);

  //Doughnut chart
  const label = goals.map((data) => data.goal);
  const remaining_events = Number(goals.map((data)=> data.task.length)[0]) + Number(resources.map((rsc)=>rsc.resource.length)[0]);
  const completed_events = Number(goals.map((data)=> data.completedTasks.length)[0]) + Number(resources.map((data)=> data.completedResources.length)[0])
  
  
  const [doughnutChartData, setdoughnutChartData] = useState({
              labels:['remaining','completed'],
              datasets: [
                {
                  label: 'Python',
                  data: [remaining_events,completed_events],
                  backgroundColor:[ 'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)']
                }, 
              ]});


  //Bar Chart
  const options = {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' ,
                },
                title: {
                  display: true,
                  text: 'Chart.js Bar Chart',
                },
                scales:{
                  x:{stacked: true,ticks:{font:{size: 14}},barThickness:50},
                  y:{stacked: true, beginAtZero: true}
                }
              },};

  const labels = goals.map((data) => data.goal);
  const [barChartData, setBarChartData] = useState({
              labels:labels,
              datasets: [
                {
                  label: "Remaining",
                  data: goals.map((data)=> data.task.length),
                  backgroundColor:"#f817171",
                  borderColor: "gray",
                  borderWidth: 2,
                  stack:'Stack 0'
                },
                {
                  label: "Completed",
                  data: goals.map((data)=> data.completedTasks.length),
                  backgroundColor:'#4ade80',
                  borderColor: "gray",
                  borderWidth: 2,
                  stack:'Stack 0'
                }
              ]});

  //UpcomingTasks Section
  const updateUpcomingTasks = async()=>{
    
          let t = await getGoal();
          const temp = t.data;

        //Selecting chart based on no of goals
          if(temp.length > 1){
            setBChart(true);
            setDChart(false);
          }   
          else{
            setDChart(true); 
            setBChart(false)
          }  

        // Updating current no of goals 
          let tasks = temp.map((item)=> item.task);

          let tasksArray = tasks.map((task)=>(task.map((item)=> {
              let p = {name:'',deadline:''}
              p.name = item.name;
              p.deadline = item.deadline;
              return p })));
            
          
          const newUpcomingTasks = tasksArray? tasksArray.filter(task => {
          const currentDate = new Date();
          const taskDeadline = new Date(task[0].deadline);
          return taskDeadline >= currentDate }): 'no tasks scheduled';

        newUpcomingTasks[0] ? newUpcomingTasks[0].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) : 'no tasks scheduled';

        setUpcomingTasks(newUpcomingTasks)
        return newUpcomingTasks;

  }

  const formatDate = (dateString) => {
  const options = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

return (
    
   <Flex flexDir='column' gap='8' p={6} bg='var(--background)' minH='100vh'>

  {/* Add Goal Button */}
  <Button 
    as={Link} 
    to='/create'
    w='full' 
    bg='var(--primary)'
    color='white'
    _hover={{ bg: 'var(--secondary)', transform: 'translateY(-2px)' }}
    _active={{ transform: 'scale(0.98)' }}
    py={7}
    borderRadius='12px'
    fontSize='xl'
    fontWeight='semibold'
    boxShadow='0 4px 12px rgba(67, 97, 238, 0.25)'
    
    className='addGoalButton'
  >
    Add New Goal
  </Button>

  {/* Goals Processing Section */}
  <Box 
    bg='var(--card)' 
    borderRadius='xl' 
    boxShadow='0 4px 6px rgba(0,0,0,0.05)'
    p={6}
    textAlign='center'
  >
    <Flex justifyContent='space-between' alignItems='center' mb={4}>
      <Heading size='lg' color='var(--secondary)' fontWeight='600'>
        Goals Progress
      </Heading>
      <ButtonGroup size='sm'>
        <Button 
          variant={bChart ? 'solid' : 'outline'} 
          colorScheme='blue'
          onClick={() => setChartType(true, false)}
        >
          Bar
        </Button>
        <Button 
          variant={dChart ? 'solid' : 'outline'} 
          colorScheme='blue'
          onClick={() => setChartType(false, true)}
        >
          Doughnut
        </Button>
      </ButtonGroup>
    </Flex>

    <Center>
      <Box w='100%' maxW='400px' h='300px'>
        {!bChart && !dChart && (
          <Center h='100%' flexDir='column'>
            <Text color='gray.500' mb={4}>Select a chart type</Text>
            <Spinner size='xl' color='blue.400' />
          </Center>
        )}
        {bChart && <Bar data={barChartData} options={options} />}
        {dChart && <Doughnut data={doughnutChartData} />}
      </Box>
    </Center>
  </Box>

  {/* Upcoming Events Section */}
  <Box 
    bg='var(--card)' 
    borderRadius='xl' 
    boxShadow='0 4px 6px rgba(0,0,0,0.05)'
    p={6}
  >
    <Flex justifyContent='space-between' alignItems='center' mb={6}>
      <Heading size='lg' color='var(--secondary)' fontWeight='600'>
        Upcoming Tasks
      </Heading>
      <Badge colorScheme='blue' fontSize='md' px={3} py={1} borderRadius='full'>
        {upcomingTasks.length} tasks
      </Badge>
    </Flex>

    {upcomingTasks.length === 0 ? (
      <Center py={8} flexDir='column'>
        <Icon as={BsCalendar2Check} boxSize={10} color='gray.300' mb={3} />
        <Text color='gray.500' fontSize='lg'>No upcoming tasks</Text>
        <Text color='gray.400' mt={2}>Add tasks to your goals to see them here</Text>
      </Center>
    ) : (
      <VStack spacing={4} align='stretch'>
        {upcomingTasks.map((taskGroup, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {taskGroup.map((task, taskIndex) => (
              <Flex 
                key={`${groupIndex}-${taskIndex}`}
                bg='white'
                borderRadius='lg'
                p={4}
                boxShadow='sm'
                borderLeft='4px solid'
                borderColor={task.priority === 'high' ? 'red.400' : task.priority === 'medium' ? 'orange.400' : 'blue.400'}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                transition='all 0.2s'
              >
                <Box flex='1'>
                  <Text fontWeight='600' fontSize='lg'>{task.name}</Text>
                  <Flex mt={2} color='gray.500' fontSize='sm' alignItems='center'>
                    <Icon as={BsCalendar} mr={2} />
                    <Text>{formatDate(task.deadline)}</Text>
                  </Flex>
                </Box>
                <Badge 
                  alignSelf='flex-start'
                  colorScheme={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'blue'}
                >
                  {task.priority} priority
                </Badge>
              </Flex>
            ))}
          </React.Fragment>
        ))}
      </VStack>
    )}
  </Box>
</Flex>
  )
}

export default HomePage
