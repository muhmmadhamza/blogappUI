import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setUser: (state, action) => {
 
      state.user = action.payload;
       state.success = true;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); 
      
    },
    loadUserFromToken: (state) => {
     
    },
  },
});

export const { setUser, setLoading, setError, logout, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
