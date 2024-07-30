'use client'

import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const expData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Dataset',
      data: [20, 40, 10],
      borderWidth: 0,
      hoverBorderWidth: 0,
      backgroundColor: ['#E1E1E1', '#DA7164', '#3FDD78'],
      fill: false,
    },
  ],
}

export default function Chart() {
  const options: ChartOptions<'doughnut'> = {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      datalabels: {
        color: '#000',
        formatter: (value: number) => {
          return `${value}`
        },
      },
    },
  }

  return (
    <div className="flex flex-col bg-white w-370 px-30 pt-15 pb-30 rounded-32 shadow-md">
      <div className="text-red-500 font-bold mb-4 flex items-center text-[#EA7465]">
        <span className="mr-4">▼ </span> 신청 현황
      </div>
      <div className="flex gap-20 py-20">
        <div
          style={{ width: '150px' }}
          className="flex flex-col items-center gap-10 text-[#6D6C6C] font-semibold"
        >
          <Doughnut data={expData} options={options} />
          샛별 어린이집
        </div>
        <div
          style={{ width: '150px' }}
          className="flex flex-col items-center gap-10 text-[#6D6C6C] font-semibold"
        >
          <Doughnut data={expData} options={options} />
          햇빛 어린이집
        </div>
      </div>
    </div>
  )
}
