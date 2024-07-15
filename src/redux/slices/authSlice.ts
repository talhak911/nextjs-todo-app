import {
  SignUpRequest,
  SignInParams,
  AuthState,
  ResetPasswordParams,
  ApiResponse,
} from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession, signIn } from "next-auth/react";

const initialState: AuthState = {
  email: null,
  user: null,
  loading: "idle",
  signUpResponse: null,
};

export const registerUser = createAsyncThunk<
  ApiResponse,
  SignUpRequest,
  { rejectValue: ApiResponse }
>(
  "auth/registerUser",
  async (registerData: SignUpRequest, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/users/signup",
        registerData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: ApiResponse }
>("auth/forgetPassword", async (email: string, { rejectWithValue }) => {
  try {
    if (!email) {
      return rejectWithValue({
        message: "Email is missing",
        success: false,
      });
    }
    const response: AxiosResponse<ApiResponse> = await axios.post(
      "/api/users/forgetpassword",
      { email }
    );
    return response.data;
  } catch (error) {
    let axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
});

export const resetPassword = createAsyncThunk<
  ApiResponse,
  ResetPasswordParams,
  { rejectValue: ApiResponse }
>(
  "auth/restPassword",
  async ({ password, token }: ResetPasswordParams, { rejectWithValue }) => {
    try {
      if (!password || !token) {
        return rejectWithValue({
          message: "Token or password is missing",
          success: false,
        });
      }
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/users/resetpassword",
        { password, token }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: `error is ${error.message}`,
        success: false,
      });
    }
  }
);

export const changePassword = createAsyncThunk<
  ApiResponse,
  { password: string; email: string },
  { rejectValue: ApiResponse }
>(
  "auth/changePassword",
  async (
    { password, email }: { password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/users/update/password",
        { password, email }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: `error is ${error.message}`,
        success: false,
      });
    }
  }
);

export const updateName = createAsyncThunk(
  "todoSlice/updateName",
  async (
    { name, email }: { name: string; email: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.put(
        "api/users/update/name",
        { name, email }
      );

      if (response.data.success) {
        dispatch(fetchUserData(email));
      }

      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateEmail = createAsyncThunk(
  "todoSlice/updateEmail",
  async (
    { email, newEmail }: { newEmail: string; email: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.put(
        "api/users/update/email",
        { email, newEmail }
      );

      if (response.data.success) {
        dispatch(fetchUserData(email));
      }

      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserData = createAsyncThunk<
  any,
  string,
  { rejectValue: ApiResponse }
>("auth/fetchUserData", async (email: string, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/users/me", {
      email,
    });

    if (response?.data?.image?.data) {
      const base64String = Buffer.from(response?.data?.image?.data).toString(
        "base64"
      );
      const img = `data:image/jpeg;base64,${base64String}`;

      const res = { ...response.data, image: img };

      return res;
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (signInData: SignInParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: signInData.email,
        password: signInData.password,
        // callbackUrl: signInData.callbackUrl,
      });
      if (response?.error) {
        return rejectWithValue(response?.error);
      } else {
        const session = await getSession();

        if (session?.user && session?.user?.email) {
          const userData = await dispatch(
            fetchUserData(session?.user?.email)
          ).unwrap();
        } else {
          return rejectWithValue("Failed to get user session");
        }
      }
    } catch (error: any) {
      return rejectWithValue(error?.error || "error occured");
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = "pending";
        state.signUpResponse = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.signUpResponse = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.signUpResponse = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.user = null;
        state.loading = "failed";
      })

      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.user = action.payload;
      })

  },
});
export const { setEmail } = authSlice.actions;
export default authSlice.reducer;
