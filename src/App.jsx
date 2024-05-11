import React from 'react';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import EnrolledCoursesPage from './components/EnrolledCoursesPage';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/CourseDetails" element={<CourseDetails />} />
      </Routes>
    </Router>

    </>
  );
};

export default App;
