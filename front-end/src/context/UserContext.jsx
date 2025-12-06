import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Update Axios instance default header whenever accessToken changes
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  // Silent Refresh on Load
  useEffect(() => {
    // Only attempt refresh if we don't have a user (i.e. on first load)
    if (!user) {
      api.post('/refresh')
        .then(({ data }) => {
          setUser(data.user);
          setAccessToken(data.accessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          setIsAuthenticated(true);
        })
        .catch((err) => {
          // If refresh fails, just stay logged out
          console.log("Silent refresh failed or no session", err);
          setUser(null);
          setAccessToken(null);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
        setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/login', { email, password });
      
      if (data.error) {
        return { error: data.error };
      }
      
      setUser(data.user);
      setAccessToken(data.accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`; // Immediate update
      setIsAuthenticated(true);
      return { success: true };
    } catch (e) {
      console.error(e);
      // Return error message from backend if available
      return { error: e.response?.data?.error || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error("Logout error", e);
    }
    // Clear local state regardless of backend success
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    
    // Clear the axios header explicitly (though useEffect handles it via state change)
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <UserContext.Provider value={{ user, setUser, accessToken, isAuthenticated, login, logout, loading }}>
        {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
