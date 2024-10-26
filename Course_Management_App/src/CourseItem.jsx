

import React from 'react';
import './CourseItem.css';

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="course-item">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default CourseItem;
