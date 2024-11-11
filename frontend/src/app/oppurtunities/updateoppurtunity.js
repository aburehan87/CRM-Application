'use client'

import { faAddressCard, faChevronLeft, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React,{useState} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateOppurtunity(props){
    const {setShowUpdate,opportunityData} = props;
    

    const [formData, setFormData] = useState({
        name: opportunityData.name || "",
        cc:"+ 91",
        phone: opportunityData.phone || "",
        email: opportunityData.email || "",
        feeQuoted: opportunityData.feeQuoted || "",
        batchTiming: opportunityData.batchTiming || "",
        leadStatus: opportunityData.leadStatus || "",
        stack: opportunityData.stack || "",
        classMode: opportunityData.classMode || "",
        status: opportunityData.status || "",
        opportunityStage:opportunityData.opportunityStage || "",
        demoAttendedStage:opportunityData.demoAttendedStage|| "",
        visitedStage:opportunityData.visitedStage || "",
        lostOpportunityReason:opportunityData.lostOpportunityReason || "",
        nextFollowUp:opportunityData.nextFollowUp || "",
        leadSource: opportunityData.leadSource || "",
        course: opportunityData.course || "",
        description: opportunityData.description || ""
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


      const updateoppurtunity = async () => {
        try {
          await fetch(`${ApiUrl}/api/opportunities/${opportunityData.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
        //   fetchData();
    
          toast.info('Successfully Updated!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    
          setTimeout(() => {
            window.location.reload(setShowUpdate(false));
          }, 2000);
        } catch (err) {
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
      };


    return (
        <div className="bg-black bg-opacity-70 absolute top-0 left-0 h-[110vh] w-full content-center">
            <div className="w-3/5 h-[70%] bg-white rounded mx-auto ">
                <div className="flex justify-between border-b px-5 h-14 text-xl">
                    <div className="flex gap-x-4 items-center">
                        <button onClick={() => setShowUpdate(false)}><FontAwesomeIcon icon={faChevronLeft} /> Back</button>
                        <p ><FontAwesomeIcon icon={faAddressCard} className="bg-[#A594F9] text-white p-2 rounded-md"/></p>
                        <h2>{formData.name}</h2>
                    </div>
                    <button className="w-32 p-1 m-2 rounded bg-[#A594F9] text-white" onClick={updateoppurtunity}>Update</button>
                </div>
                <div className="flex justify-around border-b-2">
                    <div>
                        <p>Email</p>
                        <p className="text-blue-400 font-semibold"><FontAwesomeIcon icon={faEnvelope} className="me-2"/>{formData.email}</p>
                    </div>
                    <div>
                        <p>Phone</p>
                        <p className="font-semibold text-blue-500"><FontAwesomeIcon icon={faPhone} className="me-2"/>{formData.phone}</p>
                    </div>
                    <div>
                        <p>opportunityStatus</p>
                        <p className={`text-blue-500 font-semibold ${
                            formData.status === "Visiting" ? 'text-blue-500' : formData.status === "Visited" ? 'text-green-500' : formData.status === "Demo Attended" ? 'text-orange-500' : formData.status === "Lost Opportunity" ? 'text-red-500' : ''
                        }`}>{formData.status}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 w-full p-4 overflow-y-scroll h-[80%]">
                    <div>
                        <label>Name</label> <br></br>
                        <input value={formData.name} name="name" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none" type="text" placeholder="name"></input>
                    </div>
                    <div>
                        <label>cc</label> <br></br>
                        <input value={formData.cc} name="cc" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="cc"></input>
                    </div>
                    <div>
                        <label>Phone</label> <br></br>
                        <input value={formData.phone} name="phone" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="phone" maxLength={10}></input>
                    </div>
                    <div>
                        <label>email</label> <br></br>
                        <input value={formData.email} name="email" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="email" placeholder="email"></input>
                    </div>
                    <div>
                        <label>feeQuoted</label> <br></br>
                        <input value={formData.feeQuoted} name="feeQUoted" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="number" placeholder="feeQuoted"></input>
                    </div>
                    <div>
                        <label>batchTiming</label> <br></br>
                        <input value={formData.batchTiming} name="batchTiming" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="batchTiming"></input>
                    </div>
                    <div>
                        <label>leadStatus</label> <br></br>
                        <input value={formData.leadStatus} name="leadStatus" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="leadStatus"></input>
                    </div>
                    <div>
                        <label>stack</label> <br></br>
                        <input value={formData.stack} name="stack" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="stack"></input>
                    </div>
                    <div>
                        <label>ClassMode</label> <br></br>
                        <input value={formData.classMode} name="classMode" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="ClassMode"></input>
                    </div>
                    <div>
                        <label>opportunityStatus</label> <br></br>
                        {/* <input value={formData.opportunityStatus} name="opportunityStatus" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="opportunityStatus"></input> */}
                        <select value={formData.status} name="status" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none">
                            <option>select status</option>
                            <option>Visiting</option>
                            <option>Visited</option>
                            <option>Demo Attended</option>
                            <option>Lost Opportunity</option>
                        </select>
                    </div><div>
                        <label>opportunitySatge</label> <br></br>
                        <input value={formData.opportunityStage} name="opportunitySatge" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="opportunitySatge"></input>
                    </div>
                    <div>
                        <label>DemoAttendedStage</label> <br></br>
                        <input value={formData.demoAttendedStage} name="demoAttendedStage" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="DemoAttendedStage"></input>
                    </div>
                    <div>
                        <label>visitedStage</label> <br></br>
                        <input value={formData.visitedStage} name="visitedStage" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="visitedStage"></input>
                    </div>
                    <div>
                        <label>lostOpportunityReason</label> <br></br>
                        <input value={formData.lostOpportunityReason} name="lostOpportunityReason" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="lostOpportunityReason"></input>
                    </div>
                    {/* <div>
                        <label>nextFollowUp</label> <br></br>
                        <input value={formData.nextFollowUp} name="nextFollowUp" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="datetime-local" placeholder="nextFollowUp"></input>
                    </div> */}
                    <div>
                        <label>leadSource</label> <br></br>
                        <input value={formData.leadSource} name="leadSource" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="leadSource"></input>
                    </div><div>
                        <label>course</label> <br></br>
                        <input value={formData.course} name="course" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="course"></input>
                        {/* <select value={formData.course} name="course" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none">
                            <option>select course</option>
                            <option>HR Analytics</option>
                            <option>HR Recruiter</option>
                            <option>Life Skills</option>
                            <option>Aptitude</option>
                            <option>MERN</option>
                            <option>JSF</option>
                            <option>PFS</option>
                        </select> */}
                    </div><div>
                        <label>description</label> <br></br>
                        <input value={formData.description} name="description" onChange={handleInputChange} className="w-full border-b-2 border-b-[#A594F9] rounded-b-md p-1 outline-none"  type="text" placeholder="description"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}