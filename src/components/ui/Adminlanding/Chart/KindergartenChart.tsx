'use client'

import { Doughnut } from 'react-chartjs-2'
import {
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend as ChartLegend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Legend from './Legend'
import 'chart.js/auto'

const options: ChartOptions<'doughnut'> = {
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: '#333333',
      font: {
        weight: 'bolder',
        size: 16,
      },
      formatter: (value: number) => `${value}`,
    },
  },
}

interface KindergartenChartProps {
  acceptCnt: number
  unAcceptCnt: number
  waitCnt: number
  kindergartenNm: string
  showLegend?: boolean
}

export default function KindergartenChart({
  acceptCnt,
  unAcceptCnt,
  waitCnt,
  kindergartenNm,
  showLegend = false,
}: KindergartenChartProps) {
  ChartJS.register(ArcElement, Tooltip, ChartLegend, ChartDataLabels)

  const data = {
    labels: ['승인', '승인대기', '미승인'],
    datasets: [
      {
        label: 'Dataset',
        data: [acceptCnt, waitCnt, unAcceptCnt],
        borderWidth: 0,
        hoverBorderWidth: 0,
        backgroundColor: ['#3FDD78', '#DA7164', '#E1E1E1'],
        fill: false,
      },
    ],
  }

  return (
    <div className="flex flex-col items-center justify-end">
      {showLegend && (
        <div className="py-5 pb-10">
          <Legend
            labels={data.labels}
            backgroundColors={data.datasets[0].backgroundColor}
          />
        </div>
      )}
      <div className="w-150 flex flex-col items-center gap-10 text-[#6D6C6C] font-semibold">
        <Doughnut data={data} options={options} />
        {kindergartenNm}
      </div>
    </div>
  )
}
