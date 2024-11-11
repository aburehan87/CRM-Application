'use client'

import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faChevronLeft, faPen, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { useState, useEffect, useRef } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UpdateCourse({ setShowUpdate, updateData }) {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL

  const [records, setRecords] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/api/courses/all`)
      setRecords(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const [formData, setFormData] = useState({
    courseName: updateData.courseName || "",
    courseFee: updateData.courseFee || "",
    description: updateData.description || "",
    file: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }))
  }

  const handleEditClick = () => {
    fileInputRef.current.click()
  }

  const updateLead = async () => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('courseName', formData.courseName)
      formDataToSend.append('courseFee', formData.courseFee)
      formDataToSend.append('courseDescription', formData.courseDescription)
      if (formData.file) {
        formDataToSend.append('file', formData.file)
      }

      await axios.put(`${ApiUrl}/api/courses/${updateData.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      fetchData()

      toast.success('Successfully Updated!', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      setTimeout(() => {
        window.location.reload()
        setShowUpdate(false)
      }, 2000)
    } catch (err) {
      console.error("failed to update", err)
      toast.error('Failed to update course. Please try again.', {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] bg-black bg-opacity-60 content-center">
      <ToastContainer />
      <div className="w-1/2 h-1/2 bg-[#F5EFFF] rounded-md mx-auto">
        <div className="w-full h-14 rounded-t-md bg-[#E5D9F2] content-center flex justify-between items-center pl-5">
          <div className="flex gap-x-10">
            <button onClick={() => setShowUpdate(false)} className="flex items-center">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Back
            </button>
            <h1 className="text-xl font-bold">Course Details</h1>
          </div>
          <div className="mr-5">
            <button className="w-24 p-2 bg-[#A594F9] text-white rounded-md" onClick={updateLead}>Update</button>
          </div>
        </div>
        <div className="mt-4 ml-4 flex items-end gap-x-3">
          <FontAwesomeIcon icon={faUserCircle} className="text-8xl opacity-50" />
          <button className="text-lg font-semibold flex items-center" onClick={handleEditClick}>
            Edit <FontAwesomeIcon icon={faPen} className="text-sm ms-1" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 mt-5">
          <div>
            <label>Course Name</label> <br></br>
          <input 
            type="text" 
            name="courseName" 
            onChange={handleInputChange} 
            placeholder="Course Name" 
            value={formData.courseName}  
            className="border w-full p-2 rounded-md border-b-2 border-[#A594F9] outline-none"
          />
          </div>
          <div>
            <label>Course Fee</label> <br></br>
          <input 
            type="text" 
            name="courseFee" 
            onChange={handleInputChange} 
            placeholder="Course Fee" 
            value={formData.courseFee} 
            className="border w-full p-2 rounded-md border-b-2 border-[#A594F9] outline-none"
          />
          </div>
          <div>
            <label>Description</label> <br></br>
          <input 
            type="text" 
            name="courseDescription" 
            onChange={handleInputChange} 
            placeholder="Course Description" 
            value={formData.description} 
            className="border w-[205%] p-2 rounded-md border-b-2 border-[#A594F9] outline-none col-span-2"
          />
          </div>
          {/* {formData.file && (
            <div className="col-span-2 flex items-center space-x-2 text-sm text-gray-600">
              <FontAwesomeIcon icon={faUpload} />
              <span>{formData.file.name}</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}