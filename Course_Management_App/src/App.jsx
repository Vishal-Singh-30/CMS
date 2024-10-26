import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
// new
import { getCourses, deleteCourse } from './CourseAPI';
import './App.css';

const App = () => {
  const [courses, setCourses] = useState([]);
  //new
  const [editingCourse, setEditingCourse] = useState(null);

  
  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses();
      setCourses(result);
    };
    fetchCourses();
  }, []);

  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => {
      if (editingCourse) {
        return prevCourses.map((course) => 
          course._id === newCourse._id ? newCourse : course
        );
      }
      return [...prevCourses, newCourse]; // Add new course if not editing
    });
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const cancelEdit = () => {
    setEditingCourse(null);
  };

  return (
  
    <div className="app-container">
      <CourseForm 
        onCourseAdded={handleCourseAdded} 
        courseToEdit={editingCourse} 
        onCancelEdit={cancelEdit} 
      />
      <CourseList 
        courses={courses} 
        setCourses={setCourses} 
        setEditingCourse={setEditingCourse} 
        onDeleteCourse={handleDeleteCourse}
      />
    </div>
  );
};

export default App;