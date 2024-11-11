'uses client'

import { faAddressCard, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateOpportunity(props){

    const {setShowCreateOpp} = props;

    const [name, setName] = useState("")
    const [cc,setCc] = useState("+91")
    const [phone , setPhone] = useState("")
    const [email , setEmail] = useState("")
    const [feeQuoted,setFeeQuoted] = useState(0)
    const [batchTiming,setBatchTiming] = useState("")
    const [leadStatus, setLeadStatus] = useState("")
    const [stack,setStack] = useState("")
    const [classMode,setClassMode] = useState("")
    const [status, setStatus] = useState("")
    const [opportunityStage, setOpportunityStage] = useState("")
    const [demoAttendedStage,setDemoAttendedStage] = useState("")
    const [visitedStage, setVisitedStage] = useState("")
    const [lostOpportunityReason, setLostOpportunityReason] = useState("")
    const [nextFollowUp,setNextFollowUp] = useState("")
    const [leadSource,setLeadSource] = useState("")
    const [course, setCourse] = useState("")
    const [description, setDescription] = useState("")

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


    const onSubmit =async () =>{
        const data = {
            name : name,
            cc : cc,
            phone : "+ 91 "+ phone,
            email : email,
            feeQuoted : feeQuoted,
            batchTiming : batchTiming,
            leadStatus : leadStatus,
            stack : stack,
            classMode : classMode,
            status : status,
            opportunityStage : opportunityStage,
            demoAttendedStage : demoAttendedStage,
            visitedStage : visitedStage,
            lostOpportunityReason : lostOpportunityReason,
            nextFollowUp : nextFollowUp,
            leadSource : leadSource,
            course : course,
            description : description
        }
        try{
            await axios.post(`${ApiUrl}/api/opportunities/register`,data)
            console.log("working")
            toast.success('Oppurtunity is created !', {
                position: "top-center",
                autoClose: 1499,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
                });
                // setTimeout(() => {
                //     setShowCreateOpp(false)
                //     window.location.reload()
                // },1500)
            
        }
        catch (err) {
            console.error(err)
            toast.warn('please fill all fields !', {
                position: "top-center",
                autoClose: 1499,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
                });
        }
    }


    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-[100vh] pt-[80px]">
            <ToastContainer />
            <div className="w-3/4 h-[87vh] bg-[#F5EFFF] mx-auto rounded-md p-4">
                <div className="bg-[#E5D9F2] h-14 w-full  font-bold flex justify-between p-3 text-xl rounded-t-md items-center">
                    <div className="flex gap-x-4 ">
                        <p className="bg-[#A594F9] text-white px-2  text-2xl rounded"><FontAwesomeIcon icon={faAddressCard}/></p>
                        <h1>CreateOpportunity</h1>
                    </div>
                    <button className="text-2xl" onClick={() => setShowCreateOpp(false)}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[65vh] overflow-y-scroll mt-4 border-[#A594F9] border p-4 rounded-md">
                    <div>
                        <label className="ml-2 opacity-70">Name<span className="text-red-500">*</span> </label> <br></br>
                        <input type="text" placeholder="name" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70" >CC </label> <br></br>
                        <input type="text" placeholder="CC" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={cc} onChange={(e) => setCc(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">Phone <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="Phone" maxLength={10} className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">Email <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="email" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">feeQuoted <span className="text-red-500">*</span></label> <br></br>
                        <input type="number" placeholder="feeQuoted" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={feeQuoted} onChange={(e) => setFeeQuoted(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">batchTiming <span className="text-red-500">*</span></label> <br></br>
                        {/* <input type="text" placeholder="batchTiming" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)}></input> */}
                        <select className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)}>
                            <option>select BatchTiming</option>
                            <option>7 - 8 AM</option>
                            <option>8 - 9 AM</option>
                            <option>9 - 10 AM</option>
                            <option>10 - 11 AM</option>
                            <option>11 - 12 PM</option>
                            <option>12 - 1 PM</option>
                            <option>1 - 2 PM</option>
                            <option>2 - 3 PM</option>
                            <option>3 - 4 PM</option>
                            <option>4 - 5 PM</option>
                            <option>5 - 6 PM</option>
                            <option>6 - 7 PM</option>
                            <option>7 - 8 PM</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">leadStatus <span className="text-red-500">*</span></label> <br></br>
                        {/* <input type="text" placeholder="leadStatus" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}></input> */}
                        <select className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                            <option>Select Lead Status</option>
                            <option>Not Contacted</option>
                            <option>Attempted</option>
                            <option>Warm Lead</option>
                            <option>Cold Lead</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">stack <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="stack" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={stack} onChange={(e) => setStack(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">ClassMode <span className="text-red-500">*</span></label> <br></br>
                        {/* <input type="text" placeholder="ClassMode" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={ClassMode} onChange={(e) => setClassMode(e.target.value)}></input> */}
                        <select className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={classMode} onChange={(e) => setClassMode(e.target.value)}>
                            <option>Select class Mode</option>
                            <option>HYD classroom</option>
                            <option>Online</option>
                            <option>International classroom</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">opportunityStatus<span className="text-red-500">*</span> </label> <br></br>
                        {/* <input type="text" placeholder="opportunityStatus" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={opportunityStatus} onChange={(e) => setOpportunityStatus(e.target.value)}></input> */}
                        <select className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Select Opputunity status</option>
                            <option>Visited</option>
                            <option>Visiting</option>
                            <option>Demo Attended</option>
                            <option>Lost Oppurtunity</option>
                        </select>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">opportunityStage <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="opportunityStage" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={opportunityStage} onChange={(e) => setOpportunityStage(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">DemoAttendedStage <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="DemoAttendedStage" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={demoAttendedStage} onChange={(e) => setDemoAttendedStage(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">visitedStage <span className="text-red-500">*</span></label> <br></br>
                        <input type="text" placeholder="visitedStage" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={visitedStage} onChange={(e) => setVisitedStage(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">lostOpportunityReason<span className="text-red-500">*</span> </label> <br></br>
                        <input type="text" placeholder="lostOpportunityReason" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={lostOpportunityReason} onChange={(e) => setLostOpportunityReason(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">nextFollowUp<span className="text-red-500">*</span> </label> <br></br>
                        <input type="datetime-local" placeholder="nextFollowUp" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={nextFollowUp} onChange={(e) => setNextFollowUp(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">leadSource</label> <br></br>
                        <input type="text" placeholder="leadSource" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={leadSource} onChange={(e) => setLeadSource(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">course</label> <br></br>
                        <input type="text" placeholder="course" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={course} onChange={(e) => setCourse(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="ml-2 opacity-70">description</label> <br></br>
                        <input type="text" placeholder="description" className="border w-full p-1 rounded-md outline-none border-b-2 border-b-[#A594F9]" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>
                </div>
                <div className="w-76 gap-x-2 flex justify-center mt-2">
                    <button className="w-36 p-2 border rounded-md bg-[#F5EFFF] border-[#A594F9]" onClick={() => setShowCreateOpp(false)}>cancel</button>
                    <button className="w-36 p-2 border bg-[#A594F9] rounded-md" onClick={onSubmit}>Create</button>
                </div>


            </div>
        </div>
    )
}