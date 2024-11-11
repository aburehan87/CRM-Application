'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft, faXmark, faChevronDown, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import CreateCourse from "./createcourse";
import UpdateCourse from "./updateCourse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Courses() {
  const [records, setRecords] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageDisplay, setPageDisplay] = useState(1);
  const [pageConfig, setPageConfig] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [displayActivity, setDisplayActivity] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showupdate, setShowUpdate] = useState(false);

  const recordsPerPage = 8;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchData();
  }, [pageDisplay, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/courses/all`, { method: 'GET' });
      const data = await response.json();

      const sortedRecords = data.sort((a, b) => a.id - b.id);
      const filteredRecords = filterRecords(sortedRecords);

      const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
      const paginatedRecords = filteredRecords.slice((pageDisplay - 1) * recordsPerPage, pageDisplay * recordsPerPage);
      setRecords(paginatedRecords);

      setPageConfig({
        isPrevious: pageDisplay > 1,
        isNext: pageDisplay < totalPages,
      });

      const tempArr = [];
      for (let i = 1; i <= totalPages; i++) {
        tempArr.push(i);
      }
      setPages(tempArr);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch data', {
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

  const filterRecords = (records) => {
    if (searchTerm) {
      return records.filter((record) =>
        record.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return records;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageDisplay(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages.length) {
      setPageDisplay(newPage);
    }
  };

  const handleCheckBoxChange = (e, recordId) => {
    e.stopPropagation();
    setSelectedRows((prev) => {
      if (prev.includes(recordId)) {
        return prev.filter((id) => id !== recordId);
      } else {
        return [...prev, recordId];
      }
    });
  };

  const handlerowClick = (e, lead) => {
    if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
      return;
    }
    setSelectedLead(lead);
    setShowUpdate(true);
  };

  const showPop = () => {
    if (selectedRows.length === 0) {
      toast.warning('Please Select At Least One Course', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setDeletePopUp(true);
      setDisplayActivity(false)
    }
  };

  const showUpdateScreen = () => {
    if (selectedRows.length !== 1) {
      toast.warning('Please Select Exactly One Course for Update', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const selectedLead = records.find((record) => record.id === selectedRows[0]);
      setSelectedLead(selectedLead);
      setShowUpdate(true);
      setDisplayActivity(false)
    }
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => fetch(`${ApiUrl}/api/courses/${id}`, { method: 'DELETE' }))
      );
      setSelectedRows([]);
      if (selectedRows.length === 0) {
        toast.warning('Please Select At Least One Course', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        fetchData();
        toast.success('Deleted Successfully!', {
          position: "top-center",
          autoClose: 1498,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          setDeletePopUp(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to Delete', {
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
    <div className="w-full p-4 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <ToastContainer />
      
      <div className="w-[95%] max-w-full mx-auto border-2 border-indigo-300 p-4 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col md:flex-row items-center w-full justify-between mb-6">
          <div className="flex w-full md:w-72 gap-x-4 items-center mb-4 md:mb-0">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-3xl bg-indigo-600 text-white p-2 rounded-full"
            />
            <h1 className="text-2xl font-semibold text-indigo-800">Courses</h1>
          </div>
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105" 
              onClick={() => setShowCreateCourse(true)}
            >
              Create Course
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            <div className="relative">
              <button
                className={`px-4 py-2 rounded-full border-2 border-indigo-600 font-semibold ${displayActivity ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setDisplayActivity(!displayActivity)}
              >
                Action
                <FontAwesomeIcon icon={displayActivity ? faXmark : faChevronDown} className="ml-2" />
              </button>
              {displayActivity && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-indigo-800" onClick={showUpdateScreen}>
                    Update <FontAwesomeIcon icon={faPenToSquare} className="float-right" />
                  </button>
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-red-600" onClick={showPop}>
                    Delete <FontAwesomeIcon icon={faTrash} className="float-right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <input 
            type="search" 
            className="w-full border-2 border-indigo-300 p-2 rounded-full outline-none bg-white focus:border-indigo-500 transition duration-300"
            placeholder="Search course by name or description" 
            value={searchTerm} 
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full overflow-x-auto border border-indigo-200 rounded-lg shadow-md">
          <table className="w-full">
            <thead className="bg-indigo-100">
              <tr>
                <th className="w-10 p-3">
                  <input
                    type="checkbox"
                    className="accent-neutral-900 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                    onChange={(e) => setSelectedRows(e.target.checked ? records.map((record) => record.id) : [])}
                  />
                </th>
                <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Course</th>
                <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Description</th>
                <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Fee</th>
              </tr>
            </thead>
            <tbody>
              {records && records.length > 0 ? (
                <AnimatePresence>
                  {records.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="accent-slate-100 bg-white hover:bg-indigo-50 transition-colors duration-200"
                      onClick={(e) => handlerowClick(e, record)}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                          checked={selectedRows.includes(record.id)}
                          onChange={(e) => handleCheckBoxChange(e, record.id)}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-800">{record.courseName}</td>
                      <td className="p-3 text-sm text-gray-800">{record.description}</td>
                      <td className="p-3 text-sm text-gray-800">{record.courseFee}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center">
                      <img src="./images/nodata.svg" className="w-36 h-60 mb-4" alt="No data" />
                      <h1 className="text-xl text-center font-semibold text-gray-500">No Data Found</h1>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {records.length > 0 && (
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              className={`p-2 px-4 rounded-full ${pageConfig.isPrevious ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}
              onClick={() => handlePageChange(pageDisplay - 1)}
              disabled={!pageConfig.isPrevious}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full ${page === pageDisplay ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-indigo-100'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`p-2 px-4 rounded-full ${pageConfig.isNext ? 'bg-indigo-600  text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}
              onClick={() => handlePageChange(pageDisplay + 1)}
              disabled={!pageConfig.isNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      {deletePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <img src="./images/delete.svg" alt="Delete confirmation" className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Confirm  Deletion</h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                onClick={() => setDeletePopUp(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateCourse && <CreateCourse setShowCreateCourse={setShowCreateCourse} />}
      {showupdate && <UpdateCourse setShowUpdate={setShowUpdate} updateData={selectedLead} />}
    </div>
  );
}