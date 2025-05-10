import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
        let pageName = 'Unknown';
    
        if (location.pathname === '/') {
          pageName = 'Home Page';
        } else if (location.pathname === '/add-task') {
          pageName = 'Create Task Page';
        } else if (location.pathname.startsWith('/edit/')) {
          pageName = 'Edit Task Page';
        }

    console.log(`User visited: ${pageName}`);
  }, [location]);

  return null; 
};

export default RouteLogger;