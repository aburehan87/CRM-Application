'use client'

import { faAddressCard,faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateLearner(props) {
    const {setShowCreateLearner} = props;
    const [name, setName] = useState("")
    const [idProof,setIdProof] = useState("")
    const [phone,setPhone] = useState("")
    const [DOB,setDOB] = useState("")
    const [email,setEmail] = useState("")
    const [registeredDate,setRegisteredDate] = useState("")
    const [location,setLocation] = useState("")
    const [batchId , setBatchId] = useState("")
    const [alternatePhone,setAlternatePhone] = useState("")
    const [description,setDescription] = useState("")
    const [exchangeRate,setExchangeRate] = useState("")
    const [source,setSource] = useState("")
    const [attendedDemo,setAttendedDemo] = useState("")
    const [learnerOwner,setLearnerOwner] = useState("")
    const [learnerStage,setLearnerStage] = useState("")
    const [currency,setCurrency] = useState("")
    const [leadCreatedDate,setLeadCreatedDate] = useState("")
    const [CounselingDoneBy,setCounselingDoneBy] = useState("")
    const [registeredCourse,setRegisteredCourse] = useState("")
    const [techStack,setTechStack] = useState("")
    const [courseComments,setCourseComments] = useState("")
    const [slackAccess,setSlackAccess] = useState("")
    const [lMSAccess,setLMSAccess] = useState("")
    const [preferableTime,setPreferableTime] = useState("")
    const [batchTiming,setBatchTiming] = useState("")
    const [modeOfClass,setModeOfClass] = useState("")
    const [Comment,setComment] = useState("")

    const data = {
        name : name,
        idProof : idProof || "",
        phone : "+ 91 "+phone || "",
        DOB : DOB || "",
        email : email || "",
        registeredDate : registeredDate || "",
        location : location || "",
        batchId : batchId || "",
        alternatePhone : alternatePhone || "",
        description : description || "",
        exchangeRate : exchangeRate || "",
        source : source || "",
        attendedDemo : attendedDemo || "",
        learnerOwner : learnerOwner || "",
        learnerStage : learnerStage || "",
        currency : currency || "",
        leadCreatedDate : leadCreatedDate || "",
        CounselingDoneBy : CounselingDoneBy || "",
        registeredCourse : registeredCourse || "",
        techStack : techStack || "",
        courseComments : courseComments || "",
        slackAccess : slackAccess || "",
        lMSAccess : lMSAccess || "",
        preferableTime : preferableTime || "",
        batchTiming : batchTiming || "",
        modeOfClass : modeOfClass || "",
        Comment : Comment || "",
    }
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


    const postData = async () => {
        try {
            const response = await axios.post(`${ApiUrl}/api/learners/register`, data);
            
            toast.success('Successfully created Learner!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    
            setTimeout(() => {
                setShowCreateLearner(false);
                window.location.reload();
            }, 1500);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.warn("Firstname, Email, and Phone are required fields", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.warn('Failed to create Learner!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };
    
   
    return (
        <div className="w-full h-[120vh] bg-black bg-opacity-60 absolute top-0 left-0 pt-[68px]">
            <ToastContainer />
            <div className="w-3/4 bg-[#F5EFFF] rounded h-[90vh] mx-auto ">
                   <div className="w-full p-4 bg-[#CDC1FF] p-2 items-center rounded-t-md flex justify-between">
                        <div className="flex gap-x-4 items-center">
                            <span className="bg-[#A594F9] text-xl text-white p-2  rounded-md px-3"><FontAwesomeIcon icon={faAddressCard}/></span>
                            <h1 className="font-bold text-2xl">Create Learner</h1>
                        </div>
                        <button className="text-3xl" onClick={() => setShowCreateLearner(false)}><FontAwesomeIcon icon={faXmark}/></button>
                   </div>
                   <div className="p-4">
                        <div className="w-full h-[67vh] border border-[#A594F9] rounded-md overflow-y-scroll p-2">
                           <div className="grid grid-rows md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Name <span className="text-red-500">*</span></label> <br></br>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text"  className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Name"></input>
                                    </div>
                                    
                                    <div>
                                        <label>Id Proof</label> <br></br>
                                        <input value={idProof} onChange={(e) => setIdProof(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Id Proof"></input>
                                    </div>
                                    <div>
                                        <label>Phone <span className="text-red-500">*</span></label> <br></br>
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="phone"></input>
                                    </div>
                                    <div>
                                        <label>Date Of Birth</label> <br></br>
                                        <input value={DOB} onChange={(e) => setDOB(e.target.value)} type="date" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="DOB"></input>
                                    </div>
                                    <div>
                                        <label>Email <span className="text-red-500">*</span></label> <br></br>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Email"></input>
                                    </div>
                                    <div>
                                        <label>Registration Date</label> <br></br>
                                        <input value={registeredDate} onChange={(e) => setRegisteredDate(e.target.value)} type="date" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registration Date"></input>
                                    </div>
                                    <div>
                                        <label>Location</label> <br></br>
                                        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Location"></input>
                                    </div>
                                    <div>
                                        <label>batchId</label> <br></br>
                                        <input value={batchId} onChange={(e) => setBatchId(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Id"></input>
                                    </div>
                                    <div>
                                        <label>Alternate Phone</label> <br></br>
                                        <input value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Alternate Phone" maxLength={10}></input>
                                    </div>
                                    <div>
                                        <label>Description</label> <br></br>
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Description" ></input>
                                    </div>
                                    <div>
                                        <label>Exchange Rate</label> <br></br>
                                        <input value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Exchange Rate" ></input>
                                    </div>
                                    <div>
                                        <label>Source</label> <br></br>
                                        <input value={source} onChange={(e) => setSource(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Attend Demo</label> <br></br>
                                        <input value={attendedDemo} onChange={(e) => setAttendedDemo(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Attended Demo" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Owner</label> <br></br>
                                        <input value={learnerOwner} onChange={(e) => setLearnerOwner(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Owner" ></input>
                                    </div>
                                    <div>
                                        <label>Learner Stage</label> <br></br>
                                        {/* <input value={learnerStage} onChange={(e) => setLearnerStage(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Learner Stage" ></input> */}
                                        <select value={learnerStage} onChange={(e) => setLearnerStage(e.target.value)} className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none">
                                            <option>select learner stage</option>
                                            <option>Up coming</option>
                                            <option>On going</option>
                                            <option>On Hold</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Currency</label> <br></br>
                                        <input value={currency} onChange={(e) => setCurrency(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Currency" ></input>
                                    </div>
                                    <div>
                                        <label>Lead crated time</label> <br></br>
                                        <input value={leadCreatedDate} onChange={(e) => setLeadCreatedDate(e.target.value)} type="datetime-local" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Source" ></input>
                                    </div>
                                    <div>
                                        <label>Counseling Done BY</label> <br></br>
                                        <input value={CounselingDoneBy} onChange={(e) => setCounselingDoneBy(e.target.value)} type="number" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Counseling Done BY" ></input>
                                    </div>
                           </div>
                           <h1 className="mt-4 text-xl font-semibold">Course Details</h1>
                           <div className="grid grid-rows md:grid-cols-2 gap-4">
                                <div>
                                    <label>Registered Course</label> <br></br>
                                    <input value={registeredCourse} onChange={(e) => setRegisteredCourse(e.target.value)} type="number" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Registered Course"></input>
                                </div>
                                <div>
                                    <label>Preferable Time</label> <br></br>
                                    <input value={preferableTime} onChange={(e) => setPreferableTime(e.target.value)} type="datetime-local" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Preferable Time"></input>
                                </div>
                                <div>
                                    <label>Tech Stack</label> <br></br>
                                    <input value={techStack} onChange={(e) => setTechStack(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Tech Stack"></input>
                                </div>
                                <div>
                                    <label>Batch Timing</label> <br></br>
                                    <input value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Batch Timing"></input>
                                </div>
                                <div>
                                    <label>Course Comments</label> <br></br>
                                    <input value={courseComments} onChange={(e) => setCourseComments(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Course Comments"></input>
                                </div>
                                <div>
                                    <label>Mode Of Class</label> <br></br>
                                    <input value={modeOfClass} onChange={(e) => setModeOfClass(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Mode Of Class"></input>
                                </div>
                                <div>
                                    <label>Slack Access</label> <br></br>
                                    <input value={slackAccess} onChange={(e) => setSlackAccess(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Slack Access"></input>
                                </div>
                                <div>
                                    <label>Comment</label> <br></br>
                                    <input value={Comment} onChange={(e) => setComment(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="Comment"></input>
                                </div>
                                <div>
                                    <label>LMS Access</label> <br></br>
                                    <input value={lMSAccess} onChange={(e) => setLMSAccess(e.target.value)} type="text" className="w-full p-1 border-b-2 border-b-[#A594F9] rounded-md outline-none" placeholder="LMS Access"></input>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div className="flex justify-center gap-x-3">
                        <button className="w-36 p-1 rounded-md border bg-[#CDC1FF] border-[#A594F9] " onClick={() => setShowCreateLearner(false)}>Cancel</button>
                        <button className="w-36 p-1 bg-[#A594F9] rounded-md" onClick={postData}>Create</button>
                   </div>
            </div>
        </div>
    )
}