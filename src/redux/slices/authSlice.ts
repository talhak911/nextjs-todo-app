import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for your authentication state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  theme:string
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// // Thunks for login, registration, and email verification
// export const loginUser = createAsyncThunk<
//   LoginResponse,
//   LoginParams,
//   { rejectValue: string }
// >("auth/loginUser", async (data: LoginParams, { rejectWithValue }) => {
//   try {
//     const response = await axios.post<LoginResponse>("/api/users/login", data);
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.error || "Login failed");
//   }
// });

export const registerUser = createAsyncThunk<
  LoginResponse,
  RegisterParams,
  { rejectValue: string }
>("auth/registerUser", async (data: RegisterParams, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>("/api/users/signup", data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Registration failed");
  }
});

export const verifyEmail = createAsyncThunk<
  void,
  { token: string },
  { rejectValue: string }
>("/api/users/verifyEmail", async (data: { token: string }, { rejectWithValue }) => {
  try {
    await axios.post("/api/users/verifyemail", data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Email verification failed");
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginUser.pending, (state) => {
      //   state.loading = "pending";
      // })
      // .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   state.loading = "succeeded";
      //   state.error = null;
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = "failed";
      //   state.error = action.payload ?? "Login failed";
      // })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Email verification failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
