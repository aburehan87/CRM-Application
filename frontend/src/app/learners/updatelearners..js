'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard,faXmark } from "@fortawesome/free-regular-svg-icons"
import React, { useState,useEffect } from "react"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateLearner(props) {

    const {setShowUpdate,updateData} = props;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;



  const [formData, setFormData] = useState({
    name : updateData.name || "",
    idProof : updateData.idProof || "",
     phone : updateData.phone || "",
    email : updateData.email || "",
    dob : updateData.dob || "",
    registeredDate : updateData.registeredDate || "",
    location : updateData.location || "",
    batchId : updateData.batchId || "",
    alternatePhone : updateData.alternatePhone || "",
    description : updateData.description || "",
    exchangeRate : updateData.exchangeRate || "",
    source : updateData.source || "",
    attendedDemo : updateData.attendedDemo || "",
    learnerOwner : updateData.learnerOwner || "",
    learnerStage : updateData.learnerStage || "",
    currency : updateData.currency || "",
    leadCreatedTime : updateData.leadCreatedTime || "",
    counsellingDoneBy : updateData.counsellingDoneBy || "",
    courseDetails : updateData.courseDetails || "",
    techStack : updateData.techStack || "",
    courseComments : updateData.courseComments || "",
    slackAccess : updateData.slackAccess || "",
    lMSAccess : updateData.lMSAccess || "",
    preferableTime : updateData.preferableTime || "",
    batchTiming : updateData.batchTiming || "",
    modeOfClass : updateData.modeOfClass || "",
    Comment : updateData.Comment || "",
    // nextFollowUp : updateData.nextFollowUp || "",
    // createdAt : updateData.createdAt || "",
    // updatedAt : updateData.updatedAt || ""
   
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/learners/all`);
      const data = await response.json();
      // You might want to do something with the data here
    } catch (err) {
      console.log(err);
    }
  };


const updateLearner =async () => {
    try{
        await fetch(`${ApiUrl}/api/learners/${updateData.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          fetchData();
          toast.info('Successfully Updated!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          

          setTimeout(() => {
            window.location.reload();
            setShowUpdate(false)
          }, 2000);
            }
    catch (err) {
      console.error("failed to update", err);
        toast.error('Failed to update lead. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
}


    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-70 w-full content-center h-[110vh]">
            <ToastContainer />
            <div className="w-3/4 bg-[#F5EFFF] rounded h-[80vh] mx-auto ">
                   <div className="w-full p-4 bg-[#CDC1FF] p-2 items-center rounded-t-md flex justify-between">
                        <div className="flex gap-x-4 items-center">
                            <button className="text-lg" onClick={() => setShowUpdate(false)}><FontAwesomeIcon icon={faChevronLeft}/>Back</button>
                            <span className="bg-[#A594F9] text-xl text-white p-2  rounded-md px-3"><FontAwesomeIcon icon={faAddressCard}/></span>
                            <h1 className="font-bold text-2xl">{updateData.name }</h1>
                        </div>
                        <button className="w-32 border p-1 rounded-lg bg-purple-900 text-white" onClick={updateLearner}>Update</button>
                   </div>
                   <div className="p-4">
                        <div className="w-full h-[65vh] border border-[#A594F9] rounded-md overflow-y-scroll p-2">
                           <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Name</label> <br></br>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange}  className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="first name"></input>
                                    </div>
                                    <div>
                                        <label>Id Proof</label> <br></br>
                                        <input type="text" name="idProof" value={formData.idProof} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Id Proof"></input>
                                    </div>
                                    <div>
                                        <label>Phone</label> <br></br>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="phone"></input>
                                    </div>
                                    <div>
                                        <label>Date Of Birth</label> <br></br>
                                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="DOB"></input>
                                    </div>
                                    <div>
                                        <label>Email</label> <br></br>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Email"></input>
                                    </div>
                                    <div>
                                        <label>Registration Date</label> <br></br>
                                        <input type="date" name="registeredDate" value={formData.registeredDate} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registration Date"></input>
                                    </div>
                                    <div>
                                        <label>Location</label> <br></br>
                                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Location"></input>
                                    </div>
                                    <div>
                                        <label>batchId</label> <br></br>
                                        <input type="text" name="batchId" value={formData.batchId} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Id"></input>
                                    </div>
                                    <div>
                                        <label>Alternate Phone</label> <br></br>
                                        <input type="text" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Alternate Phone" maxLength={10}></input>
                                    </div>
                                    <div>
                                        <label>Description</label> <br></br>
                                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Description" ></input>
                                    </div>
                                    <div>
                                        <label>Exchange Rate</label> <br></br>
                                        <input type="text" name="exchangeRate" value={formData.exchangeRate} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Exchange Rate" ></input>
                                    </div>
                                    <div>
                                        <label>Source</label> <br></br>
                                        <input type="text" name="source" value={formData.source} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Attend Demo</label> <br></br>
                                        <input type="text" name="attendedDemo" value={formData.attendedDemo} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Attended Demo" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Owner</label> <br></br>
                                        <input type="text" name="learnerOwner" value={formData.learnerOwner} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Owner" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Stage</label> <br></br>
                                        {/* <input type="text" name="learnerStage" value={formData.learnerStage} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Stage" ></input> */}
                                        <select name="learnerStage" value={formData.learnerStage} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none">
                                            <option>select learner stage</option>
                                            <option>Up coming</option>
                                            <option>On going</option>
                                            <option>On Hold</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Currency</label> <br></br>
                                        <input type="text" name="currency" value={formData.currency} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Currency" ></input>
                                    </div>
                                    <div>
                                        <label>Lead crated time</label> <br></br>
                                        <input type="datetime-local" name="leadCreatedTime" value={formData.leadCreatedTime} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Counseling Done BY</label> <br></br>
                                        <input type="number" name="counsellingDoneBy" value={formData.counsellingDoneBy} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Counseling Done BY" ></input>
                                    </div>
                           </div>
                           <h1 className="mt-4 text-xl font-semibold">Course Details</h1>
                           <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>Registered Course</label> <br></br>
                                    <input type="text" name="courseDetails" value={formData.courseDetails} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registered Course"></input>
                                </div>
                                <div>
                                    <label>Preferable Time</label> <br></br>
                                    <input type="datetime-local" name="preferableTime" value={formData.preferableTime} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Preferable Time"></input>
                                </div>
                                <div>
                                    <label>Tech Stack</label> <br></br>
                                    {/* <input type="text" name="techStack" value={formData.techStack} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Tech Stack"></input> */}
                                    <select name="techStack" value={formData.techStack} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none">
                                        <option>select stack</option>
                                        <option>JFS</option>
                                        <option>PFS</option>
                                        <option>MERN</option>
                                        <option>Study Abroad</option>
                                        <option>HR</option>
                                        <option>Life Skills</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Batch Timing</label> <br></br>
                                    <input type="text" name="batchTiming" value={formData.batchTiming} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Timing"></input>
                                </div>
                                <div>
                                    <label>Course Comments</label> <br></br>
                                    <input type="text" name="courseComments" value={formData.courseComments} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Course Comments"></input>
                                </div>
                                <div>
                                    <label>Mode Of Class</label> <br></br>
                                    <input type="text" name="modeOfClass" value={formData.modeOfClass} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Mode Of Class"></input>
                                </div>
                                <div>
                                    <label>Slack Access</label> <br></br>
                                    {/* <input type="text" name="slackAccess" value={formData.slackAccess} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Slack Access"></input> */}
                                    <select name="slackAccess" value={formData.slackAccess} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none">
                                        <option>Select </option>
                                        <option>YES</option>  
                                        <option>NO</option>  
                                    </select>                                
                                </div>
                                <div>
                                    <label>Comment</label> <br></br>
                                    <input type="text" name="Comment" value={formData.Comment} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Comment"></input>
                                </div>
                                <div>
                                    <label>LMS Access</label> <br></br>
                                    {/* <input type="text" name="lMSAccess" value={formData.lMSAccess} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="LMS Access"></input> */}
                                    <select name="lMSAccess" value={formData.lMSAccess} onChange={handleInputChange} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none">
                                        <option>select</option>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                   </div>
                   
            </div>
        </div>
    )
}