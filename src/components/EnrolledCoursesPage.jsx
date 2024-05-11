import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';

const EnrolledCoursesPage = ({ userId }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      const q = query(collection(db, 'enrollments'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const courses = [];
      querySnapshot.forEach(doc => {
        courses.push(doc.data());
      });
      setEnrolledCourses(courses);
    }

    fetchEnrolledCourses();
  }, [userId]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Your Enrolled Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-gray-200 rounded-md p-4 shadow-md">
            <h2 className="text-lg font-semibold">{course.courseName}</h2>
            <p className="text-gray-600 mt-2">Instructor: {course.teacher}</p>
            <p className="text-gray-600">Schedule: {course.schedule}</p>
          </div>
        ))}
        {enrolledCourses.length === 0 && (
          <p className="text-gray-600">You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
