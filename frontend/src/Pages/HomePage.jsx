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
import { resourceStore } from '../store/resource.store';

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

const { resources,getResource} = resourceStore();
const [upcomingTasks, setUpcomingTasks] = useState([]);
const [bChart, setBChart] = useState(false);
const [dChart, setDChart] = useState(false);

useEffect(() => {
   getResource();
  updateUpcomingTasks();
},[getResource]);

//Doughnut chart
const label = resources.map((data) => data.goal);

const [doughnutChartData, setdoughnutChartData] = useState({
  labels:['remaining','completed'],
  datasets: [
    {
      label: 'Python',
      data: [resources.map((data)=> data.task.length),resources.map((data)=> data.completedTasks.length)],
      backgroundColor:[ 'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)']
    },
    
     
  ]
});


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
  },
};



const labels = resources.map((data) => data.goal);
const [chartData, setChartData] = useState({
  labels:labels,
  datasets: [
    {
      label: "Remaining",
      data: resources.map((data)=> data.task.length),
      backgroundColor:"#f817171",
      borderColor: "gray",
      borderWidth: 2,
      stack:'Stack 0'
    },
    {
      label: "Completed",
      data: resources.map((data)=> data.completedTasks.length),
      backgroundColor:'#4ade80',
      borderColor: "gray",
      borderWidth: 2,
      stack:'Stack 0'
    }
  ]
});


const updateUpcomingTasks = async()=>{
  
  let t = await getResource();
  const temp = t.data;
  console.log(bChart,dChart)
  if(temp.length > 1){
    setBChart(true);
    setDChart(false);
  }   
  else{
    setDChart(true); 
    setBChart(false)
  }  // Updating current no of goals 
  console.log(temp.length)
  let tasks = temp.map((item)=> item.task);

  let tasksArray = tasks.map((task)=>(task.map((item)=> {
      let p = {name:'',deadline:''}
      p.name = item.name;
      p.deadline = item.deadline;
      return p
  })));
    
  
const upcomingTasks = tasksArray? tasksArray.filter(task => {
  const currentDate = new Date();
  const taskDeadline = new Date(task[0].deadline);
  return taskDeadline >= currentDate;
}): 'no tasks scheduled';

upcomingTasks ? upcomingTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) : 'no tasks scheduled';



setUpcomingTasks(upcomingTasks)
return upcomingTasks;

}



  return (
    <div>
      <Flex flexDir='column' gap='24'>
      <Button w='full'><Link to='/create'>+ add goal</Link></Button>

        <Box>
        <Center>
        <div  style={{ width: '400px', height: '300px' }}>
          {!bChart && !dChart }
          {bChart && <Bar data={chartData} options={options}></Bar> }
          {dChart && <Doughnut data={doughnutChartData}></Doughnut>}
          
        </div>
        </Center>
        
        <Heading color='blue.400' textAlign='center'>Goals Processing</Heading>
        </Box>

        <Box>
        <div>

        <Flex gap='40' flexDir='row'>
        <Heading><Text>Upcoming Tasks</Text></Heading>
        </Flex>
        
          {upcomingTasks.map((task)=>{
            return(
              <>
              {task.map((item)=>{
                return  <p>{item.name} &nbsp; {item.deadline}</p>
              })}
              
              </>
            )
          })}
        </div>
        </Box>

      </Flex>

      
    </div>
  )
}

export default HomePage
