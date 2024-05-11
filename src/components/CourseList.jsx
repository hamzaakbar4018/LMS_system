import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'; // Importing 'where' and 'orderBy' for querying
import { Link } from 'react-router-dom';

const CourseList = () => {
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'courses')); // Get data

    const data = [];
    querySnapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }
  
  const [userdata, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetch() {
      const data = await fetchData();
      setUserData(data);
    }
    fetch();
  }, []);

  // Filter userdata based on search term
  const filteredData = userdata.filter(user => user.course_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className='main flex flex-col mt-2 text-xl justify-center items-start ml-6'>
        <h1 className='bg-gray-500 p-4 rounded-md mb-4'>The Courses are:</h1>
        <input
          type="text"
          placeholder="Search by course name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-200 p-2 rounded-md mb-4"
        />
        <div className="space-y-4 mt-4">
          {filteredData.map(user => (
            <div key={user.id} className="bg-gray-400 flex p-4 rounded-lg shadow-md">
              <p className="font-semibold">Course: {user.course_name}</p>
              <p className="text-gray-600 ml-4">Instructor: {user.teacher}</p>
              <div className='ml-6'>
                <Link to="/CourseDetails">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded">
                    View details
                  </button>
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
