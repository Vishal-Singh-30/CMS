import axios from 'axios';

const API_URL = 'http://localhost:5000/courses'; // Ensure this matches your backend URL

// Function to add a new course
export const addCourse = async (course) => {
  try {
    const response = await axios.post(API_URL, course);
    return response.data; // Return the added course
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// Function to get all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of courses
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Function to update an existing course
export const updateCourse = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data; // Return the updated course
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Function to delete a course
export const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Return the ID of the deleted course
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};