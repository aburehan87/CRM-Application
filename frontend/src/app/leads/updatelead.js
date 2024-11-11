'use client'

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export default function UpdateLead({ hideUpdateScreen, updateData,onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    name: updateData.name || "",
    cc:updateData.cc || "",
    phone: updateData.phone || "",
    email: updateData.email || "",
    feeQuoted: updateData.feeQuoted || 0,
    batchTiming: updateData.batchTiming || "",
    leadStatus: updateData.leadStatus || "",
    stack: updateData.stack || "",
    classMode: updateData.classMode || "",
    nextFollowUp: updateData.nextFollowUp || "",
    leadSource: updateData.leadSource || "",
    course: updateData.course || "",
    description: updateData.description || ""
  });


  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateLead = async () => {
    try {
      const response = await axios.put(`${ApiUrl}/api/leads/${updateData.id}`,formData)
      toast.success('Successfully Updated!', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.reload(hideUpdateScreen())
        onUpdateSuccess(response.data)

      }, 2000);

    } catch (err) {
      console.error("Failed to update:", err);
      toast.error('Failed to update lead. Please try again.', {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full h-[130vh] p-3 absolute top-0 left-0 bg-black bg-opacity-50 ">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto p-2 rounded-md ">
        <div className="w-full h-16 mt-14 bg-[#CDC1FF] flex justify-between items-center rounded-t-md">
          <div className="p-2 ml-5 flex gap-x-3  items-center">
            <button className="text-lg p-1 text-md" onClick={hideUpdateScreen}>
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            <div className="flex items-center gap-x-2 text-sm md:text-lg">
              <FontAwesomeIcon icon={faAddressCard} className="p-2 bg-indigo-500 text-white text-xl rounded" />
              <p className="text-xl font-semibold italic">{formData.name}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mr-4 ">
            <button className="w-full md:w-20 p-2 rounded font-semibold bg-indigo-500 text-white" onClick={updateLead}>Update</button>
          </div>
        </div>

        <div className="w-full p-2 bg-[#F5EFFF] border-t-2 border-b-2 border-[#A594F9] gap-x-20 grid grid-cols-2 md:grid-cols-4 ">
          <div className="w-full ">
            <h1 className="">Lead Source</h1>
            <p className="text-[#1998FF] font-semibold ">{formData.leadSource}</p>
          </div>
          <div className="w-full ">
            <h1>Phone</h1>
            <p className="text-[#1998FF] font-semibold">
              <FontAwesomeIcon icon={faPhone} className="text-sm me-2" />
              <span>{formData.phone}</span>
            </p>
          </div>
          <div className="w-full ">
            <h1>Email</h1>
            <p className="text-[#1998FF] font-semibold">{formData.email}</p>
          </div>
          <div className="w-full ">
            <h1>Lead Status</h1>
            <p className={`font-semibold ${formData.leadStatus === "Not Contacted" ? "text-orange-500" : formData.leadStatus === "Attempted" ? "text-green-500" : formData.leadStatus === "Warm Lead" ? "text-yellow-400" : formData.leadStatus === "Cold Lead" ? "text-red-500" : ""}`}>
              {formData.leadStatus}
            </p>
          </div>
        </div>

        <div className="w-full h-[70vh] overflow-y-scroll p-4 mt-0 bg-[#F5EFFF] rounded-b-md">
          <button className="border-b-4 border-b-[#A594F9] bg-[#CDC1FF] px-2 py-1 rounded-t-md">Details</button>
          <div className="w-full mt-2 bg-[#F5EFFF] mx-auto p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Name</label>
                <br />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border-b-2 border-b-[#A594F9] rounded p-1 mb-2 w-full outline-none" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Lead Status</label>
                <br />
                <select name="leadStatus" value={formData.leadStatus} onChange={handleInputChange} className="border-b-2 p-1 mt-1 w-full outline-none border-b-[#A594F9] rounded">
                  <option>Select Lead Status</option>
                  <option>Not Contacted</option>
                  <option>Attempted</option>
                  <option>Warm Lead</option>
                  <option>Cold Lead</option>
                </select>
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">cc</label>
                <br />
                <input type="text" name="cc" value={formData.cc} onChange={handleInputChange} placeholder="Phone" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Phone</label>
                <br />
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Email</label>
                <br />
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Lead Source</label>
                <br />
                <select name="leadSource" value={formData.leadSource} onChange={handleInputChange} className="border-b-2 p-1 mt-1 w-full outline-none border-b-[#A594F9] rounded">
                  <option>Select Lead Source</option>
                  <option>None</option>
                  <option>Walk in</option>
                  <option>Student Referral</option>
                  <option>Demo</option>
                  <option>Website</option>
                  <option>Website Chat</option>
                  <option>Inbound Call</option>
                  <option>Google Adverts</option>
                  <option>Facebook Ads</option>
                  <option>Google Business</option>
                  <option>WhatsApp Skill Capital</option>
                </select>
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Batch Timing</label>
                <br />
                <input type="text" name="batchTiming" value={formData.batchTiming} onChange={handleInputChange} placeholder="Batch Timing" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Class Mode</label>
                <br />
                <input type="text" name="classMode" value={formData.classMode} onChange={handleInputChange} placeholder="Class Mode" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Course</label>
                <br />
                <input type="text" name="course" value={formData.course} onChange={handleInputChange} placeholder="Course" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Fee Quoted</label>
                <br />
                <input type="number" name="feeQuoted" value={formData.feeQuoted} onChange={handleInputChange} placeholder="Fee Quoted" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">stack</label>
                <br />
                <input type="text" name="stack" value={formData.stack} onChange={handleInputChange} placeholder="stack" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">nextFollowUp</label>
                <br />
                <input type="datetime-local" name="nextFollowup" value={formData.nextFollowUp} onChange={handleInputChange} placeholder="NextFollowUp" className="border-b-2 p-1 mb-2 w-full outline-none border-b-[#A594F9] rounded" />
              </div>
              <div>
                <label className="ml-2 text-[#A594F9] text-lg">Description</label>
                <br />
                <input name="description" value={formData.description} onChange={handleInputChange} className="border-b-2 w-full outline-none border-b-[#A594F9] rounded p-4" placeholder="Description" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}