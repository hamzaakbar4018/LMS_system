import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const CourseDetails = () => {
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'student')); // Get data

    const data = [];
    querySnapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetch() {
      const data = await fetchData();
      setCourses(data);
    }
    fetch();
  }, []);

  const enrollCourse = async (courseId) => {
    const userId = 'user123'; 
    const enrollmentData = {
      userId,
      courseId,
      enrolledAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'enrollments'), enrollmentData);
      console.log('Enrollment successful! Document ID:', docRef.id);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Enrollment failed. Please try again later.');
    }
  };

  return (
    <>
      <div className='main flex flex-col mt-2 text-xl justify-center items-start ml-6'>
        <h1 className='bg-gray-500 p-4 rounded-md mb-4'>Course Details:</h1>
        <div className="space-y-4 mt-4">
          {courses.map(course => (
            <div key={course.id} className="bg-gray-400 flex p-4 rounded-lg shadow-md">
              <p className="font-semibold">Course: {course.course_name}</p>
              <p className="text-gray-600 ml-4">Instructor: {course.teacher}</p>
              <p className="text-gray-600 ml-4">Duration: {course.course_duration}</p>
              <p className="text-gray-600 ml-4">Description: {course.description}</p>
              <p className="text-gray-600 ml-4">Location: {course.location}</p>
              <p className="text-gray-600 ml-4">Pre-requisites: {course.pre_requisites}</p>
              <p className="text-gray-600 ml-4">Schedule: {course.schedule}</p>
              <div className='ml-6'>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
                  onClick={() => enrollCourse(course.id)}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
