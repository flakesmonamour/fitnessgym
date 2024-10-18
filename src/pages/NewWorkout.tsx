import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/workoutSlice';
import { useNavigate } from 'react-router-dom';

const WorkoutSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  duration: Yup.number()
    .positive('Must be a positive number')
    .integer('Must be an integer')
    .required('Required'),
  calories: Yup.number()
    .positive('Must be a positive number')
    .integer('Must be an integer')
    .required('Required'),
});

const NewWorkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { type: string; duration: number; calories: number }) => {
    try {
      // Simulating API call
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const workout = await response.json();
        dispatch(addWorkout(workout));
        navigate('/');
      } else {
        // Handle error
        console.error('Failed to log workout');
      }
    } catch (error) {
      console.error('Error logging workout:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Log New Workout</h2>
      <Formik
        initialValues={{ type: '', duration: 0, calories: 0 }}
        validationSchema={WorkoutSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field
              as="select"
              name="type"
              className="w-full p-2 border rounded"
            >
              <option value="">Select Workout Type</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Weight Training">Weight Training</option>
            </Field>
            <ErrorMessage name="type" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="duration" component="div" className="text-red-500" />
          </div>
          <div>
            <Field
              type="number"
              name="calories"
              placeholder="Calories Burned"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="calories" component="div" className="text-red-500" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Log Workout
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewWorkout;