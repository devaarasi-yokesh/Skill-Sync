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
} from 'chart.js';
import {Bar} from 'react-chartjs-2'
import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { isBefore, isToday, isTomorrow, compareAsc, parseISO } from 'date-fns';
import { resourceStore } from '../store/resource.store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const HomePage = () => {

const { resources,getResource} = resourceStore();
const [upcomingTasks, setUpcomingTasks] = useState([]);

useEffect(() => {
   getResource()
},[getResource]);


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
  labels,
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
})
let tasks = resources.map((item)=> item.task);

const updateUpcomingTasks = ()=>{
  const dateObj = new Date();
  //  const currentDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
  //  console.log(currentDate,dateObj,tasks,resources)

  const tasksArray = tasks[0];
  tasksArray.forEach(task => {
    console.log(task.deadline)
  });

  const currentDate = new Date();
const upcomingTasks = tasksArray.filter(task => {
  const taskDeadline = new Date(task.deadline);
  return taskDeadline >= currentDate;
});
upcomingTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));


setUpcomingTasks(upcomingTasks)
return upcomingTasks;

}

  return (
    <div>
      <button className='w-full cursor-pointer text-gray-900'><Link to='/create'>+ add goal</Link></button>
      <div  style={{ width: '400px', height: '300px' }}>
      <Bar data={chartData} options={options}></Bar>
      </div>
      <div>
        <button onClick={updateUpcomingTasks}>try</button>
        <Text>Upcoming Tasks</Text>
        {upcomingTasks.map((task)=>{
          return(
            <>
            <p>{task.name}</p>
            </>
          )
        })}
      </div>
      
    </div>
  )
}

export default HomePage
