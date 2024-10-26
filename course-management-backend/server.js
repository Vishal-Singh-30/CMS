// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/courses', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const courseSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       }
// });

// const Course = mongoose.model('Course', courseSchema);

// // Get all courses
// app.get('/courses', async (req, res) => {
//   const courses = await Course.find();
//   res.json(courses);
// });

// // Add a new course
// app.post('/courses', async (req, res) => {
//   const newCourse = new Course(req.body);
//   await newCourse.save();
//   res.status(201).json(newCourse);
// });

// // Delete a course
// app.delete('/courses/:id', async (req, res) => {
//   await Course.findByIdAndDelete(req.params.id);
//   res.status(204).send();
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add body-parser for parsing request bodies

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Course schema and model
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

// Routes

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new course
app.post('/courses', async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
  const { title, description } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true } // Return the updated course
    );
    if (!updatedCourse) return res.status(404).send('Course not found');
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).send('Course not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});