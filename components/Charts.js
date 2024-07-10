"use client"
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export const PieChart = () => {
  const data = {
    labels: ['USA', 'Japan', 'UK', 'Korea', 'Switzerland', 'Others'],
    datasets: [
      {
        label: '# of users',
        data: [40, 25, 15, 10, 5, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}

export const BarChart = () => {
  const data = {
    labels: ['India', 'Bangladesh', 'Pakistan', 'Nepal', 'China', 'Germany', 'Australia', 'USA'],
    datasets: [
      {
        label: '# of Active Users',
        data: [1500, 700, 300, 1600, 800, 180, 2000, 2000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  return <Bar data={data} />
}
