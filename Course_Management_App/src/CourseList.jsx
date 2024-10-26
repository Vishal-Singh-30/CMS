import React from 'react';
import CourseItem from './CourseItem';

const CourseList = ({ courses, setEditingCourse, onDeleteCourse }) => {
  const handleEdit = (course) => {
    setEditingCourse(course); // Set the course to be edited
  };

  return (
    <div>
      <h2>Course List</h2>
      {courses.map((course) => (
        <CourseItem
          key={course._id}
          course={course}
          onEdit={() => handleEdit(course)}
          onDelete={() => onDeleteCourse(course._id)}
        />
      ))}
    </div>
  );
};

export default CourseList;
