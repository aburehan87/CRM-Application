'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateLead({ closeForm }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cc, setCc] = useState("+91 ");
    const [email, setEmail] = useState('');
    const [leadStatus, setLeadStatus] = useState('Not Contacted');
    const [leadSource, setLeadSource] = useState('Website');
    const [feeQuoted, setFeeQuoted] = useState('');
    const [batchTiming, setBatchTiming] = useState('7-8 AM');
    const [classMode, setClassMode] = useState("HYD class");
    const [course, setCourse] = useState("");
    const [description, setDescription] = useState("");
    const [stack, setStack] = useState("");
    const [nextFollowUp, setNextFollowUp] = useState("");

    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = {
                name,
                email,
                cc: "+91",
                phone: "+ 91 " + phone,
                feeQuoted,
                batchTiming,
                leadStatus,
                leadSource,
                course,
                classMode,
                stack,
                nextFollowUp,
                description
            };

            console.log("Submitting data:", formData);

            const response = await axios.post(`${ApiUrl}/api/leads/register`, formData);
            console.log("Successfully submitted:", response.data);

            if (response.status === 200) {
                toast.success('Lead Created Successfully!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });

                setTimeout(() => {
                    closeForm();
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    toast.warning('Lead already exists. Would you like to update it?', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        closeButton: ({ closeToast }) => (
                            <div>
                                <button onClick={() => handleUpdateExistingLead(closeToast)}>Update</button>
                                <button onClick={closeToast}>Cancel</button>
                            </div>
                        )
                    });
                } else {
                    toast.error(`Failed to create Lead: ${error.response.data}`, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                }
            } else {
                toast.error('An unexpected error occurred', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
            console.error("Error submitting data:", error);
        }
    };

    const handleUpdateExistingLead = async (closeToast) => {
        try {
            const formData = {
                name,
                email,
                cc: "+91",
                phone: "+ 91 " + phone,
                feeQuoted,
                batchTiming,
                leadStatus,
                leadSource,
                course,
                classMode,
                stack,
                nextFollowUp,
                description
            };

            const response = await axios.put(`${ApiUrl}/api/leads/update`, formData);
            console.log("Successfully updated:", response.data);

            toast.success('Lead Updated Successfully!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });

            setTimeout(() => {
                closeForm();
                window.location.reload();
            }, 1500);
        } catch (error) {
            toast.error(`Failed to update Lead: ${error.response?.data || 'Unknown error'}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
        closeToast();
    };

    return (
        <div className="w-full h-[130vh] absolute top-0 left-0 bg-black bg-opacity-70 flex justify-center items-start pt-[68px]">
            <ToastContainer />
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-purple-200 border-b">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faAddressCard} className="bg-purple-500 text-white text-2xl p-2 rounded-full" />
                        <h1 className="text-2xl font-semibold text-gray-800">Create Lead</h1>
                    </div>
                    <button onClick={closeForm}>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl text-gray-600 hover:text-gray-800 transition" />
                    </button>
                </div>
                <div className="px-6 py-4 bg-gray-50 h-[80vh] overflow-y-auto">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Name <span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    placeholder="name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Lead Status <span className="text-red-500">*</span></label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={leadStatus} 
                                    onChange={(e) => setLeadStatus(e.target.value)}
                                >
                                    <option value="Not Contacted">Not Contacted</option>
                                    <option value="Attempted">Attempted</option>
                                    <option value="Warm Lead">Warm Lead</option>
                                    <option value="Cold Lead">Cold Lead</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Phone<span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    maxLength={10} 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    required 
                                    placeholder="phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">cc</label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={cc} 
                                    onChange={(e) => setCc(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email<span className="text-red-400">*</span></label>
                                <input 
                                    type="email" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder="email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Lead Source</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={leadSource} 
                                    onChange={(e) => setLeadSource(e.target.value)}
                                >
                                    <option value="Walk in">Walk in</option>
                                    <option value="Student Referral">Student Referral</option>
                                    <option value="Demo">Demo</option>
                                    <option value="Website">Website</option>
                                    <option value="Website Chat">Website Chat</option>
                                    <option value="Inbound Call">Inbound Call</option>
                                    <option value="Google Adverts">Google Adverts</option>
                                    <option value="Facebook Ads">Facebook Ads</option>
                                    <option value="Google Business">Google Business</option>
                                    <option value="WhatsApp Skill Capital">WhatsApp Skill Capital</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">stack <span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={stack} 
                                    onChange={(e) => setStack(e.target.value)} 
                                    placeholder="stack"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Course <span className="text-red-400">*</span></label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={course} 
                                    onChange={(e) => setCourse(e.target.value)} 
                                    placeholder="courses"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Fee Quoted<span className="text-red-400">*</span></label>
                                <input 
                                    type="number" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={feeQuoted} 
                                    onChange={(e) => setFeeQuoted(e.target.value)} 
                                    required 
                                    placeholder="fee quoted"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Batch Timing</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={batchTiming} 
                                    onChange={(e) => setBatchTiming(e.target.value)}
                                >
                                    <option value="7-8 AM">7-8 AM</option>
                                    <option value="9-10 AM">9-10 AM</option>
                                    <option value="11-12 AM">11-12 AM</option>
                                    <option value="6-7 PM">6-7 PM</option>
                                    <option value="8-9 PM">8-9 PM</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">NextFollowUp</label>
                                <input 
                                    type="datetime-local" 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={nextFollowUp} 
                                    onChange={(e) => setNextFollowUp(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Class Mode</label>
                                <select 
                                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={classMode} 
                                    onChange={(e) => setClassMode(e.target.value)}
                                >
                                    <option value="HYD class">HYD class</option>
                                    <option value="HYD Online">HYD Online</option>
                                    <option value="BLR class">BLR class</option>
                                    <option value="BLR Online">BLR Online</option>
                                    <option value="Vizag class">Vizag class</option>
                                    <option value="Vizag Online">Vizag Online</option>
                                    <option value="USA Online">USA Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Description</label>
                                <input 
                                    type="text" 
                                    className="mt-1 p-2 block w-[208%] rounded-md border-gray-300 shadow-sm outline-none border border-b-2 border-b-purple-500" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition focus:outline-none"
                            >
                                Create Lead
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}