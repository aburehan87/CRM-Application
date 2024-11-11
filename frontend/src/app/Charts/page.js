import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

function Charts({ leadsByHour, leadsByStatus }) {
  const lineChartData = {
    labels: leadsByHour.map(lead => lead.hour),
    datasets: [
      {
        label: 'Number of Leads',
        data: leadsByHour.map(lead => lead.leadCount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const doughnutChartData = {
    labels: leadsByStatus.labels,
    datasets: [
      {
        data: leadsByStatus.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Leads by Hour</h2>
        <Line data={lineChartData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Leads by Status</h2>
        <Doughnut data={doughnutChartData} />
      </div>
    </div>
  )
}

export default Charts