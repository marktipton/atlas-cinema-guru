import React from 'react';
import { useTitles } from '@/contexts/TitlesProvider';

type Activity = {
  type: string;
  title: string;
  time: string;
};

const LatestActivities = () => {
  const { activities } = useTitles();

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
                    Unfavorited <span className="font-semibold">{activity.title}</span>
                  </>
                )}
                {activity.type === 'watchlater' && (
                  <>
                    Added <span className="font-semibold">{activity.title}</span> to watch later
                  </>
                )}
                {activity.type === 'unwatchlater' && (
                  <>
                    Removed <span className="font-semibold">{activity.title}</span> from watch later
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