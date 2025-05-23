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
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { isBefore, isToday, isTomorrow, compareAsc, parseISO } from 'date-fns';
import { goalStore } from '../store/goal.store';

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


return (
    
    <Flex flexDir='column' gap='24'>

      <Button w='full' className='addGoalButton'><Link to='/create'>+ add goal</Link></Button>

      <Box>
            <Center>
                <div  style={{ width: '400px', height: '300px' }}>
                  {!bChart && !dChart }
                  {bChart && <Bar data={barChartData} options={options}></Bar> }
                  {dChart && <Doughnut data={doughnutChartData}></Doughnut>}
                  
                </div>
            </Center>
            
            <Heading color='blue.400' textAlign='center'>Goals Processing</Heading>
        </Box>



      <Box>

          <Flex gap='40' flexDir='row'>
          <Heading><Text>Upcoming Events</Text></Heading>
          </Flex>
          
            {upcomingTasks.map((task)=>{
                  return(
                      <>

                      {task.map((item)=>{

                          return (
                          <>
                          <p>{item.name} </p>
                          <p> {item.deadline}</p>
                          </>
                          
                      )})}
                      
                      </>
            )})}

        </Box>

    </Flex>
  )
}

export default HomePage
