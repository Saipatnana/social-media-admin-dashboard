import React, { createContext, useState } from 'react';
import {users,posts} from '../data/dummyData'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usersCount,setUsersCount] = useState(users.length)
  const [postsCount,setPostCount] = useState(posts.length)
  const [recentPostsCount,setRecentPostsCount] = useState(0)
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,usersCount,setUsersCount,postsCount,setPostCount,recentPostsCount,setRecentPostsCount }}>
      {children}
    </AuthContext.Provider>
  );
};
