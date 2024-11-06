import React, { useState, useEffect } from 'react';
import { useTitles } from '@/contexts/TitlesProvider';

type Activity = {
  type: string;
  title: string;
  time: string;
};

const LatestActivities = () => {
  const { activities } = useTitles();

  // // This function will simulate adding a new activity
  // const addActivity = (type: string, title: string) => {
  //   const newActivity: Activity = {
  //     type,
  //     title,
  //     time: new Date().toLocaleString(), // Store the current time
  //   };
  //   setActivities((prevActivities) => [newActivity, ...prevActivities]);
  // };

  // useEffect(() => {
  //   // This is just a placeholder for testing
  //   addActivity('Favorited', 'Movie 1'); // Simulating an activity when the component mounts
  //   addActivity('WatchLater', 'Movie 2');
  // }, []);

  return (
    <div className="bg-teal rounded-lg p-2">
      <div className="text-lg font-bold text-blue mb-2">
        Latest Activities
      </div>
      <div className="space-y-2">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="p-1 rounded-md text-blue">
            <div className="text-xs text-blue">{activity.time}</div>
            <div className="text-xs">
                {activity.type === 'favorited' && (
                  <>
                    Favorited <span className="font-semibold">{activity.title}</span>
                  </>
                )}
                {activity.type === 'unfavorited' && (
                  <>
                    Added <span className="font-semibold">{activity.title}</span> to watch later
                  </>
                )}
              </div>
          </div>
          ))
        ) : (
          <div>No recent activities</div>
        )}
      </div>
    </div>
  );
};

export default LatestActivities;