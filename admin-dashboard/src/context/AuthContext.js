import React, { createContext, useState ,useEffect} from 'react';
import {users,posts} from '../data/dummyData'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usersCount, setUsersCount] = useState(() => {
    const storedCount = localStorage.getItem("usersCount");
    return storedCount ? parseInt(storedCount) : users.length;
  });
  const [postsCount,setPostCount] = useState(() => {
    const storedCount = localStorage.getItem("postsCount");
    return storedCount ? parseInt(storedCount) : posts.length;
  })
  useEffect(() => {
    localStorage.setItem("usersCount", usersCount);
    localStorage.setItem("postsCount",postsCount)
  }, [usersCount,postsCount]);
  
  const [recentPostsCount,setRecentPostsCount] = useState(0)
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,usersCount,setUsersCount,postsCount,setPostCount,recentPostsCount,setRecentPostsCount }}>
      {children}
    </AuthContext.Provider>
  );
};
