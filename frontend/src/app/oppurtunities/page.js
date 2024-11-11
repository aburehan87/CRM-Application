'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronLeft, faChevronRight, faTable, faPenToSquare, faTrash, faXmark, faLink } from "@fortawesome/free-solid-svg-icons";
import KanbanOppurtunity from "../kanban/oppurtunityKanban";
import CreateOpportunity from "./createOppurtunity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateOppurtunity from "./updateoppurtunity";
import axios from "axios";

export default function Opportunities() {
  const [records, setRecords] = useState([]);
  const [pageConfig, setPageConfig] = useState({});
  const [pageDisplay, setPageDisplay] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Opportunities");
  const [searchTerm, setSearchTerm] = useState("");
  const [showKanban, setShowKanban] = useState(false);
  const [displayActivity, setDisplayActivity] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreateOpp, setShowCreateOpp] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [opportunityData, setOpputunityData] = useState(null);
  const [showConvert, setShowConvert] = useState(false);

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
    getLastRecords();
  }, [pageDisplay, selectedFilter, searchTerm]);

  const getLastRecords = async () => {
    try {
      let response = await fetch(`${ApiUrl}/api/opportunities/all`, { method: "GET" });
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
        isNext: pageDisplay < totalPages
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
    const today = new Date();
    let filteredRecords = records;

    switch (selectedFilter) {
      case "All Opportunities":
        break;
      case "Today's Opportunities":
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === today.toDateString();
        });
        break;
      case "Yesterday's Opportunities":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate.toDateString() === yesterday.toDateString();
        });
        break;
      case "This week Opportunities":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfWeek && recordDate <= today;
        });
        break;
      case "Last Month Opportunities":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.createdAt);
          return recordDate >= startOfMonth && recordDate <= endOfMonth;
        });
        break;
      case "Visiting":
      case "Visited":
      case "Demo Attended":
      case "Lost Opportunity":
        filteredRecords = filteredRecords.filter(record => record.status === selectedFilter);
        break;
      default:
        break;
    }

    if (searchTerm) {
      filteredRecords = filteredRecords.filter(record => {
        const name = record.name ? record.name.toLowerCase() : "";
        const phone = record.phone ? record.phone : "";
        return name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
      });
    }

    return filteredRecords;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages.length) {
      setPageDisplay(newPage);
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

  const handleStatusClick = (status) => {
    setSelectedFilter(status);
    setPageDisplay(1);
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(selectedRows.map(id => fetch(`${ApiUrl}/api/opportunities/${id}`, { method: "DELETE" })));
      toast.success('Deleted successfully!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDisplayActivity(false);
      getLastRecords();
      setDeletePopUp(false);
      setSelectedRows([]);
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete', {
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

  const showPop = () => {
    if (selectedRows.length === 0) {
      toast.warn('Select at least one record!', {
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
      setDisplayActivity(false);
    }
  };

  const handleCheckboxChange = (e, recordId) => {
    e.stopPropagation();
    setSelectedRows(prev => {
      if (prev.includes(recordId)) {
        return prev.filter(id => id !== recordId);
      } else {
        return [...prev, recordId];
      }
    });
  };

  const showUpdateScreen = () => {
    if (selectedRows.length !== 1) {
      toast.warning('Please select exactly one record for update', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDisplayActivity(false);
    } else {
      const selectOpportunity = records.find(record => record.id === selectedRows[0]);
      setOpputunityData(selectOpportunity);
      setShowUpdate(true);
    }
  };

  const handleRowClick = (e, oppdata) => {
    if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
      return;
    }
    setOpputunityData(oppdata);
    setShowUpdate(true);
  };

  const handleConvertToLearners = async () => {
    const selectedLeads = records.filter(record => selectedRows.includes(record.id));
    let successCount = 0;
    let failCount = 0;
    let deletedLeadsCount = 0;

    for (const lead of selectedLeads) {
      const dataLearners = {
        name: lead.name || "",
        idProof: lead.idProof || "",
        phone: lead.phone || "",
        dob: lead.dob || "",
        email: lead.email || "",
        registeredDate: lead.registeredDate || "",
        location: lead.location || "",
        batchId: lead.batchId || "",
        alternatePhone: lead.alternatePhone || "",
        description: lead.description || "",
        exchangeRate: lead.exchangeRate || "",
        source: lead.source || "",
        attendedDemo: lead.attendedDemo || "",
        learnerOwner: lead.learnerOwner || "",
        learnerStage: lead.learnerStage || "",
        currency: lead.currency || "",
        leadCreatedTime: lead.leadCreatedTime || "",
        counsellingDoneBy: lead.counsellingDoneBy || "",
        courseDetails: lead.courseDetails || "",
        preferableTime: lead.preferableTime || "",
        techStack: lead.stack || "",
        batchTiming: lead.batchTiming || "",
        courseComments: lead.courseComments || "",
        modeOfClass: lead.modeOfClass || "",
        slackAccess: lead.slackAccess || "",
        comment: lead.comment || "",
        lmsAccess: lead.lmsAccess || ""
      };

      try {
        const response = await axios.post(`${ApiUrl}/api/learners/register`, dataLearners);
        console.log(response.data);
        successCount++;

        try {
          await axios.delete(`${ApiUrl}/api/opportunities/${lead.id}`);
          deletedLeadsCount++;
        } catch (deleteErr) {
          console.error(`Failed to delete lead ${lead.id}:`, deleteErr);
        }
      } catch (err) {
        console.error(`Failed to convert lead ${lead.id}:`, err);
        failCount++;
      }
    }

    if (successCount > 0) {
      if (selectedLeads.length === 1) {
        toast.success(`Lead ${selectedLeads[0].name} converted to learners !`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } else {
        toast.success(`${successCount} lead${successCount > 1 ? 's' : ''} converted to learners !`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    }

    if (failCount > 0) {
      toast.error(`Failed to convert ${failCount} opportunity ${failCount > 1 ? 's' : ''} to learners`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }

    if (deletedLeadsCount !== successCount) {
      toast.warning(`${successCount - deletedLeadsCount} lead${successCount - deletedLeadsCount > 1 ? 's were' : ' was'} converted but not removed from opportunities`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }

    setShowConvert(false);
    setSelectedRows([]);
    getLastRecords();
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
              className="w-full md:w-72 outline-none bg-transparent text-xl font-semibold text-indigo-800"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option>All Opportunities</option>
              <option>Today's Opportunities</option>
              <option>Yesterday's Opportunities</option>
              <option>This week Opportunities</option>
              <option>Last Month Opportunities</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105" 
              onClick={() =>   setShowCreateOpp(true)}
            >
              Create Opportunity
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
              {displayActivity && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-indigo-800" onClick={showUpdateScreen}>
                    Update <FontAwesomeIcon icon={faPenToSquare} className="float-right" />
                  </button>
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-red-600" onClick={showPop}>
                    Delete <FontAwesomeIcon icon={faTrash} className="float-right" />
                  </button>
                  <button className="w-full p-2 text-left hover:bg-indigo-100 text-green-600" onClick={() => setShowConvert(true)}>
                    Convert <FontAwesomeIcon icon={faLink} className="float-right" />
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
          <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-0">
            {["All Opportunities", "Visiting", "Visited", "Demo Attended", "Lost Opportunity"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
                  selectedFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
                onClick={() => handleStatusClick(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm border border-indigo-500 rounded-lg">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                !showKanban
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setShowKanban(false)}
            >
              <FontAwesomeIcon icon={faTable} className="mr-2" /> Table
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium  rounded-r-md ${
                showKanban
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setShowKanban(true)}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Kanban
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
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out accent-neutral-900"
                      onChange={(e) => setSelectedRows(e.target.checked ? records.map(record => record.id) : [])}
                    />
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Created on</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Opportunity Status</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Name</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Phone</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Stack</th>
                  <th className="p-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Course</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {records && records.length > 0 ? (
                    records.map((d, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="bg-white hover:bg-indigo-50 transition-colors duration-200"
                        onClick={(e) => handleRowClick(e, d)}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out accent-slate-500"
                            checked={selectedRows.includes(d.id)}
                            onChange={(e) => handleCheckboxChange(e, d.id)}
                          />
                        </td>
                        <td className="p-3 text-sm text-gray-800">{formatDate(d.createdAt)}</td>
                        <td className="p-3">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            d.status === 'Visited' ? 'bg-orange-100 text-orange-800' :
                            d.status === 'Visiting' ? 'bg-green-100 text-green-800' :
                            d.status === 'Demo Attended' ? 'bg-yellow-100 text-yellow-800' :
                            d.status === 'Lost Opportunity' ? 'bg-red-100 text-red-800' : ''
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-800">{d.name}</td>
                        <td className="p-3 text-sm text-gray-800">{d.phone}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            d.stack === "Life Skill" ? 'bg-pink-100 text-pink-800' :
                            d.stack === "Study Abroad" ? 'bg-teal-100 text-teal-800' :
                            d.stack === "HR" ? 'bg-blue-100 text-blue-800' : ''
                          }`}>
                            {d.stack}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            d.course === 'MERN' ? 'bg-red-100 text-red-800' :
                            d.course === 'TOFEL' ? 'bg-teal-100 text-teal-800' :
                            d.course === 'AWS + Devops' ? 'bg-blue-100 text-blue-800' :
                            d.course === 'JFS' ? 'bg-green-100 text-green-800' :
                            d.course === "PFS" ? 'bg-orange-100 text-orange-800' :
                            d.course === 'HR Business Partner' ? 'bg-indigo-100 text-indigo-800' :
                            d.course === 'HR Generalist' ? 'bg-purple-100 text-purple-800' :
                            d.course === 'HR Analytics' ? 'bg-pink-100 text-pink-800' :
                            d.course === 'Spoken English' ? 'bg-yellow-100 text-yellow-800' :
                            d.course === 'Public Speaking' ? 'bg-cyan-100 text-cyan-800' :
                            d.course === 'Communication Skills' ? 'bg-lime-100 text-lime-800' :
                            d.course === 'Soft Skills' ? 'bg-emerald-100 text-emerald-800' :
                            d.course === 'Aptitude' ? 'bg-fuchsia-100 text-fuchsia-800' :
                            d.course === 'IELTS' ? 'bg-amber-100 text-amber-800' :
                            d.course === 'GRE' ? 'bg-violet-100 text-violet-800' :
                            d.course === 'Azure + Devops' ? 'bg-sky-100 text-sky-800' : ''
                          }`}>
                            {d.course}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="flex flex-col items-center justify-center">
                          <img src="./images/nodata.svg" className="w-1/4 h-60 mb-4" alt="No data" />
                          <h1 className="text-2xl font-semibold text-gray-500">No Data Found</h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <KanbanOppurtunity />
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
      {showCreateOpp && <CreateOpportunity setShowCreateOpp={setShowCreateOpp} />}
      {showUpdate && <UpdateOppurtunity setShowUpdate={setShowUpdate} opportunityData={opportunityData} />}
      {showConvert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="bg-indigo-100 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-indigo-800">Convert Lead</h2>
              <button onClick={() => setShowConvert(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-2xl text-indigo-600 hover:text-indigo-800" />
              </button>
            </div>
            <div className="p-6">
              <img src="./images/convert.svg" alt="Convert" className="w-48 h-48 mx-auto mb-6" />
              <p className="text-center text-gray-600 mb-6">Convert into corresponding</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                  onClick={handleConvertToLearners}
                >
                  To Learners
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}