// CreateCourse.js

'use client';

import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faPenFancy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Make sure to export this component as default
export default function CreateCourse(props) {
    const { setShowCreateCourse } = props;

    const [courseImage, setCourseImage] = useState("");
    const [courseImagePreview, setCourseImagePreview] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseFee, setCourseFee] = useState("");
    const [description, setDescription] = useState("");
    const [courseBrochure, setCourseBrochure] = useState("");

    const fileInputRef = useRef(null);
    const brochureInputRef = useRef(null);


    const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCourseImage(reader.result); // Store Base64 string
                setCourseImagePreview(URL.createObjectURL(file)); // Preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBrochureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCourseBrochure(reader.result); // Store Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleBrochureEditClick = () => {
        brochureInputRef.current.click();
    };

    const courseCreate = async () => {
        const data = {
            courseName: courseName,
            courseFee: courseFee,
            description: description,
            courseImage: courseImage, // Base64 string for image
            courseBrochure: courseBrochure // Base64 string for brochure
        };
        try {
            

            // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/register`, data, {
            //     headers: {
            //         'Content-Type': 'application/json' // Send as JSON
            //     }
            // });

            await axios.post(`${ApiUrl}/api/courses/register`,data)

            toast.success('Course created!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            // Optional: Uncomment to reset the form
            // setShowCreateCourse(false);
            // window.location.reload();
        } catch (err) {
            console.error(err); // Log error for debugging
            toast.error('Failed to create!', {
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
    };

    return (
        <div className="absolute top-0 left-0 w-full pt-[100px] h-[120vh] bg-black bg-opacity-50">
            <ToastContainer />
            <div className="w-3/5 h-[70vh] border-2 bg-[#F5EFFF] mx-auto rounded-lg p-4">
                <div className="flex gap-x-3 text-xl items-center w-full border-b-2 border-b-[#A594F9] pb-2 justify-between">
                    <div className="flex items-center gap-x-4">
                        <p><FontAwesomeIcon icon={faAddressCard} className="text-2xl bg-[#A594F9] text-white p-2 rounded" /></p>
                        <p className="font-semibold text-2xl">Create Course</p>
                    </div>
                    <button><FontAwesomeIcon icon={faXmark} onClick={() => setShowCreateCourse(false)} /></button>
                </div>
                <div className="mt-2">
                    <p className="text-xl font-semibold">Course Image</p>
                    <p className="mt-3 flex items-end">
                        {courseImagePreview ? (
                            <img src={courseImagePreview} alt="Course" className="text-[#A594F9] opacity-75 rounded-full" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        ) : (
                            <FontAwesomeIcon icon={faUserCircle} className="text-[#A594F9] text-7xl opacity-75" />
                        )}
                        <span className="cursor-pointer border-b-2" onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faPenFancy} /> Edit
                        </span>
                    </p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }} 
                    />
                    <p className="mt-2 text-xl font-semibold">Course Information</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 border-b-2 border-b-[#A594F9] pb-12">
                    <div>
                        <p>Course Name <span className="text-red-500">*</span></p>
                        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name" className="p-1 border-b-2 w-full outline-none rounded border-b-[#A594F9]" />
                    </div>
                    <div>
                        <p>Course Fee<span className="text-red-400">*</span></p>
                        <input type="text" value={courseFee} onChange={(e) => setCourseFee(e.target.value)} placeholder="Course Fee" className="p-1 border-b-2 w-full outline-none rounded border-b-[#A594F9]" />
                    </div>
                    <div>
                        <p>Description <span className="text-red-500">*</span></p>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-1 border-b-2 w-full outline-none rounded border-b-[#A594F9]" />
                    </div>
                    <div>
                        <p>Course Brochure</p>
                        <p className="border-b-purple-500 border-b-2 rounded-md flex items-end bg-white p-1">
                            <span className="cursor-pointer border-b-2" onClick={handleBrochureEditClick}>
                                course Brochure
                            </span>
                        </p>
                        <input 
                            type="file" 
                            ref={brochureInputRef} 
                            onChange={handleBrochureChange}  
                            style={{ display: 'none' }} 
                        />
                    </div>
                </div>
                <div className="flex gap-x-2 justify-center mt-3">
                    <button className="w-40 p-2 border-2 border-[#A594F9] bg-[#CDC1FF] rounded" onClick={() => setShowCreateCourse(false)}>Cancel</button>
                    <button className="w-40 p-2 bg-[#A594F9] text-white rounded" onClick={courseCreate}>Create</button>
                </div>
            </div>
        </div>
    );
}
