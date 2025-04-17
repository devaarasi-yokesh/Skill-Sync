import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2'
import { useState } from 'react';
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

const { resources} = resourceStore();



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const {getResource} = resourceStore();
const updateChart = async() =>{
  const d = await getResource();
  console.log('ResourceData',d.data)
}


const labels = resources.map((data) => data.goal);
console.log(labels)
const [chartData, setChartData] = useState({
  labels,
  datasets: [
    {
      label: "Goals Processed",
      data: resources.map((data)=> data.task.length),
      backgroundColor:[
        "rgb(224, 255, 255)"
      ],
      borderColor: "gray",
      borderWidth: 2
    }
  ]
})

  return (
    <div>
      <button onClick={updateChart}>Update</button>
      <Bar data={chartData} options={options}></Bar>
    </div>
  )
}

export default HomePage
