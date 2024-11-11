'use client'

import React, { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function Sample() {
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState(Views.MONTH)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('Enter Event Title')
      if (title) {
        setEvents((prev) => [...prev, { title, start, end }])
      }
    },
    []
  )

  const handleSelectEvent = useCallback(
    (event) => {
      const newTitle = window.prompt('Edit Event Title', event.title)
      if (newTitle) {
        setEvents((prev) =>
          prev.map((ev) => (ev === event ? { ...ev, title: newTitle } : ev))
        )
      }
    },
    []
  )

  const handleViewChange = useCallback((view) => {
    setCurrentView(view)
  }, [])

  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate)
  }, [])

  return (
    <div className='pt-[40px] p-8 bg-[#CDC1FF]'>
      <Calendar
        className="bg-[#F5EFFF] border p-4 rounded-lg shadow-md"
        localizer={localizer}
        events={events}
        selectable={true}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={currentView}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day', 'agenda']}
        step={60}
        showMultiDayTimes
        toolbar={true}
        popup={true}
      />
    </div>
  )
}