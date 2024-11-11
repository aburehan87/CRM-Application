'use client'

import { useRouter } from "next/navigation"
import Charts from '../../components/charts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Dashboard() {
  const router = useRouter()
  const [leadsByHour, setLeadsByHour] = useState([])
  const [leadsByStatus, setLeadsByStatus] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        setIsLoading(true)
        const hourlyResponse = await fetch(`${ApiUrl}/api/leads/today-leads-hourly`)
        const hourlyResult = await hourlyResponse.json()
        const processedLeadsByHour = processLeadsByHour(hourlyResult)

        const statusResponse = await fetch(`${ApiUrl}/api/leads/lead-status-count`)
        const statusResult = await statusResponse.json()
        const processedLeadsByStatus = processLeadsByStatus(statusResult)

        setLeadsByHour(processedLeadsByHour)
        setLeadsByStatus(processedLeadsByStatus)
      } catch (error) {
        console.error('Error fetching leads data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadsData()
  }, [])

  const processLeadsByHour = (leads) => {
    const hoursInDay = Array.from({ length: 24 }, (_, i) => i)
    return hoursInDay.map((hour) => {
      const leadForHour = leads.find(lead => parseInt(lead[0]) === hour)
      return {
        hour: hour.toString().padStart(2, '0') + ':00',
        leadCount: leadForHour ? parseInt(leadForHour[1]) : 0,
      }
    })
  }

  const processLeadsByStatus = (leads) => {
    return {
      labels: leads.map(lead => lead[0]),
      data: leads.map(lead => parseInt(lead[1])),
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6">
              <Charts leadsByHour={leadsByHour} leadsByStatus={leadsByStatus} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard