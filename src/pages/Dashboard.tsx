import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setWorkouts } from '../store/workoutSlice';
import { Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Simulating API call
        // For demonstration, let's return some mock data
        const mockWorkouts = [
          { id: '1', type: 'Running', duration: 30, calories: 300, date: new Date().toISOString() },
          { id: '2', type: 'Cycling', duration: 45, calories: 400, date: new Date().toISOString() },
        ];
        dispatch(setWorkouts(mockWorkouts));
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError('Failed to fetch workouts. Please try again later.');
      }
    };

    if (user.isLoggedIn) {
      fetchWorkouts();
    }
  }, [dispatch, user.isLoggedIn]);

  if (!user.isLoggedIn) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Welcome to FitTrack</h2>
        <p>Please log in or register to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Your Dashboard</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <Activity className="mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">{workout.type}</h3>
            </div>
            <p>Duration: {workout.duration} minutes</p>
            <p>Calories: {workout.calories}</p>
            <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;