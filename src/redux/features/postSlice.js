import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const API_URL = import.meta.env.VITE_API_URL;
 export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formData, {getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    try {
      const response = await axios.post(`${API_URL}/posts/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' ,
          Authorization: `Bearer ${token}`,

          
        },
      });
      toast.success('Post created successfully!');
      return response.data;  
    } catch (error) {

      return rejectWithValue(error.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Reducers for setting state (optional)
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload.savedPost);
        state.success = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default postSlice.reducer;
