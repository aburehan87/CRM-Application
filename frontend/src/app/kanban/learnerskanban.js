'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function LearnersKanban() {
  const [records, setRecords] = useState([])
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/api/learners/all`)
      setRecords(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const statusColumns = [
    { title: "Up coming", color: "bg-[#D2E0FB]", border: "border-[#8EACCD]", recordColor: "bg-[#D1E9F6]" },
    { title: "On going", color: "bg-[#8FD14F]", border: "border-[#6EC207]", recordColor: "bg-[#C1E2A4]" },
    { title: "On Hold", color: "bg-[#FD8B51]", border: "border-[#FF6500]", recordColor: "bg-[#FF885B]" },
    { title: "Completed", color: "bg-[#FA7070]", border: "border-[#FF204E]", recordColor: "bg-red-300" },
  ]

  return (
    <div className="w-full p-4 overflow-x-auto">
      <div className="min-w-[1000px] md:w-full">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {statusColumns.map((column, index) => (
            <div key={index} className={`${column.color} ${column.border} border-t-4 h-20 p-3 font-semibold rounded`}>
              <p>{column.title}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {statusColumns.map((column, index) => (
            <div key={index} className="border h-[80vh] rounded bg-[#E5E7EB] p-2 overflow-y-auto">
              {records
                .filter(record => record.learnerStage === column.title)
                .map((record, i) => (
                  <div key={i} className={`${column.recordColor} rounded p-2 m-1`}>
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">{record.name}</p>
                      <p className="text-xs">{record.phone}</p>
                    </div>
                    <p className="text-xs mt-1">{record.email}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}