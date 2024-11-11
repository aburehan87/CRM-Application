'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronLeft, faChevronRight, faTable, faTrash, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import LearnersKanban from "../kanban/learnerskanban";
import CreateLearner from "./createlearner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateLearner from "./updatelearners.";

export default function Learners() {
  const [records, setRecords] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageConfig, setPageConfig] = useState({});
  const [pageDisplay, setPageDisplay] = useState(1);
  const [displayActivity, setDisplayActivity] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [leadId, setLeadId] = useState();
  const [showCreateLearner, setShowCreateLearner] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Learners");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  const recordsPerPage = 10;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetchedData();
  }, [pageDisplay, selectedFilter, searchTerm]);

  const fetchedData = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/learners/all`);
      const data = await response.json();

      const sortedRecords = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

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
    let filteredRecords = records;

    switch (selectedFilter) {
      case "All Learners":
        break;
      case "Today's Learners":
        filteredRecords = filteredRecords.filter((record) => {
          const recordDate = new Date(record.createdAt);
          const today = new Date();
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's Learners":
        filteredRecords = filteredRecords.filter((record) => {
          const recordDate = new Date(record.createdAt);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Learners":
        filteredRecords = filteredRecords.filter((record) => {
          const recordDate = new Date(record.createdAt);
          const today = new Date();
          const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          return recordDate >= firstDayOfWeek;
        });
        break;
      case "Last Month Learners":
        filteredRecords = filteredRecords.filter((record) => {
          const recordDate = new Date(record.createdAt);
          const today = new Date();
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          return recordDate >= lastMonth && recordDate < thisMonth;
        });
        break;
      default:
        break;
    }

    if (searchTerm) {
      filteredRecords = filteredRecords.filter((record) =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) || record.phone.includes(searchTerm)
      );
    }

    return filteredRecords;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages.length) {
      setPageDisplay(newPage);
    }
  };

  const showPop = () => {
    if (selectedRows.length === 0) {
      toast.warn('Please select at least one record!', {
        position: "top-center",
        autoClose: 1000,
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

  const handleCheckboxChange = (recordId) => {
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
      return
    }
    setSelectedLead(lead)
    setShowUpdate(true)
  }

  const confirmDelete = async () => {
    try {
      await Promise.all(selectedRows.map((id) => fetch(`${ApiUrl}/api/learners/${id}`, { method: "DELETE" })));
      setSelectedRows([]);
      fetchedData();
      toast.success('Deleted Successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDisplayActivity(false)
      setTimeout(() => {
        setDeletePopUp(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Delete!', {
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

  const updateModel = () => {
    if (selectedRows.length !== 1) {
      toast.warn('Please select exactly one record for update!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDisplayActivity(false)
    } else {
      const selectedLead = records.find(record => record.id === selectedRows[0])
      setSelectedLead(selectedLead)
      setShowUpdate(true)
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setPageDisplay(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageDisplay(1);
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
            <select
              className="w-full md:w-60 outline-none bg-transparent text-xl font-semibold text-indigo-800"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option>All Learners</option>
              <option>Today's Learners</option>
              <option>Yesterday's Learners</option>
              <option>This week Learners</option>
              <option>Last Month Learners</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105" 
              onClick={() => setShowCreateLearner(true)}
            >
              Create Learner
              <FontAwesomeIcon icon={faChevronDown} className="ml-2"/>
            </button>
            <div className="relative">
              <button
                className={`px-4 py-2 rounded-full border-2 border-indigo-600 font-semibold ${displayActivity ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setDisplayActivity(!displayActivity)}
              >
                Action
                <FontAwesomeIcon icon={displayActivity ? faXmark : faChevronDown} className="ml-2" />
              </button>
              {displayActivity && !showUpdate && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-indigo-800" onClick={updateModel}>
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
        <div className="flex items-center mb-6 flex-col md:flex-row">
          <input
            type="search"
            className="w-full md:flex-grow mr-4 border-2 border-indigo-300 p-2 rounded-full outline-none bg-white focus:border-indigo-500 transition duration-300"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="w-80 flex rounded-full overflow-hidden border-2 border-indigo-300 mt-4 md:mt-0">
            <button
              className={`px-4 w-1/2 py-2 ${!showKanban ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
              onClick={() => setShowKanban(false)}
            >
              <FontAwesomeIcon icon={faTable} className="mr-2" /> Table
            </button>
            <button
              className={`px-4 w-1/2 py-2 ${showKanban ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
              onClick={() => setShowKanban(true)}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-1" /> Kanban
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-auto border border-indigo-200 rounded-lg shadow-md">
          {!showKanban ? (
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
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Created Time</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Registered Date</th>
                  <th className="p-3 text-left  text-xs font-medium text-indigo-800 uppercase tracking-wider">Name</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Phone</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Stack</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Course</th>
                </tr>
              
              </thead>
              <tbody>
                <AnimatePresence>
                  {records && records.length > 0 ? (
                    records.map((record, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white hover:bg-indigo-50 transition-colors duration-200"
                        onClick={(e) => handlerowClick(e,record) }
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="accent-slate-100 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            checked={selectedRows.includes(record.id)}
                            onChange={() => handleCheckboxChange(record.id)}
                          />
                        </td>
                        <td className="p-3 text-sm text-gray-800">
                          {new Date(record.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-800">{formatDate(record.registeredDate)}</td>
                        <td className="p-3 text-sm text-gray-800">{record.name}</td>
                        <td className="p-3 text-sm text-gray-800">{record.phone}</td>
                        <td className="p-3">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {record.techStack}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {record.courseDetails}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="flex flex-col items-center justify-center">
                          <img src="./images/nodata.svg" className="w-40 h-60 mb-4" alt="No data" />
                          <h1 className="text-xl text-center font-semibold text-gray-500">No Data Found</h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <LearnersKanban />
          )}
        </div>
        {records.length > 0 && !showKanban && (
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              className={`p-2 px-4 rounded-full ${
                pageConfig.isPrevious ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
              onClick={() => handlePageChange(pageDisplay - 1)}
              disabled={!pageConfig.isPrevious}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full ${
                  page === pageDisplay ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-indigo-100'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`p-2 px-4 rounded-full ${
                pageConfig.isNext ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
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
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Confirm Deletion</h2>
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
      {showCreateLearner && <CreateLearner setShowCreateLearner={setShowCreateLearner} />}
      {showUpdate && (<UpdateLearner setShowUpdate={setShowUpdate} updateData={selectedLead}/>)}
    </div>
  );
}