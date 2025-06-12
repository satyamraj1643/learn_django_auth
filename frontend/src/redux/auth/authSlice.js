import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: null,
  loading: false,
  error: null,
  signupSuccess: false,
  isActivated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/jwt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      console.log("data from login", data)

      return data;
    } catch (err) {
      return rejectWithValue({ detail: "Network Error" });
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, name, password, re_password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password, re_password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (err) {
      return rejectWithValue({ detail: "Network Error" });
    }
  }
);

// Async thunk for account activation
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ uid, token }, { rejectWithValue }) => {
    console.log(uid, "-----", token);
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/activation/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, token }),
      });

      let data = null;

      // Only try to parse JSON if response has content
      if (response.status !== 204) {
        data = await response.json();
        console.log("data from activate is", data);
      }

      if (!response.ok) {
        return rejectWithValue(data || { detail: "Unknown error" });
      }

      return { success: true };
    } catch (err) {
      return rejectWithValue({ detail: 'Network Error' });
    }
  }
);

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isActivated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        state.isActivated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || "Login Failed!";
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload?.detail || "Signup failed";
      })

      // Activation
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isActivated = false;
      })
      .addCase(authenticateUser.fulfilled, (state) => {
        state.loading = false;
        state.isActivated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.isActivated = false;
        state.error = action.payload?.detail || "Activation failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
