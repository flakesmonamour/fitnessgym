import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setGroups, joinGroup } from '../store/groupSlice';
import { Users } from 'lucide-react';

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups.groups);
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Simulating API call with mock data
        const mockGroups = [
          { id: '1', name: 'Running Enthusiasts', members: 50 },
          { id: '2', name: 'Yoga for Beginners', members: 30 },
          { id: '3', name: 'Weightlifting Pros', members: 40 },
        ];
        dispatch(setGroups(mockGroups));
      } catch (error) {
        console.error('Error fetching groups:', error);
        setError('Failed to fetch groups. Please try again later.');
      }
    };

    if (user.isLoggedIn) {
      fetchGroups();
    }
  }, [dispatch, user.isLoggedIn]);

  const handleJoinGroup = async (groupId: string) => {
    try {
      // Simulating API call
      // For demonstration, let's consider the join action always successful
      dispatch(joinGroup(groupId));
    } catch (error) {
      console.error('Error joining group:', error);
      setError('Failed to join group. Please try again later.');
    }
  };

  if (!user.isLoggedIn) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Fitness Groups</h2>
        <p>Please log in or register to view and join groups.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Fitness Groups</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <Users className="mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">{group.name}</h3>
            </div>
            <p>Members: {group.members}</p>
            <button
              onClick={() => handleJoinGroup(group.id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;