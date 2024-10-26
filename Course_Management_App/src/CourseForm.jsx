import React, { useState, useEffect } from 'react';
import { addCourse, updateCourse } from './CourseAPI';
import './CourseForm.css';

const CourseForm = ({ onCourseAdded, courseToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //new
  const [errorMessage, setErrorMessage] = useState('');

  // new 
  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title);
      setDescription(courseToEdit.description);
    }
  }, [courseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setErrorMessage(''); // Clear previous errors
    const courseData = { title, description };

    try {
      if (courseToEdit) {
        const updatedCourse = await updateCourse(courseToEdit._id, courseData);
        onCourseAdded(updatedCourse); // Update the course in the list
      } else {
        const addedCourse = await addCourse(courseData);
        onCourseAdded(addedCourse); // Add new course
      }

      setTitle(''); // Clear the form fields
      setDescription('');
      if (onCancelEdit) onCancelEdit(); // Clear edit mode
    } catch (error) {
      setErrorMessage('Failed to submit course. Please try again.'); // Handle errors
      console.error("Error submitting course:", error);
    }
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <h2>{courseToEdit ? 'Edit Course' : 'Add New Course'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Course Description"
        required
      />
      <button type="submit">{courseToEdit ? 'Update Course' : 'Add Course'}</button>
      {courseToEdit && <button type="button" onClick={onCancelEdit}>Cancel</button>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default CourseForm;