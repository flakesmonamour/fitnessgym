import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

interface WorkoutState {
  workouts: Workout[];
}

const initialState: WorkoutState = {
  workouts: [],
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    setWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
    },
  },
});

export const { addWorkout, setWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;