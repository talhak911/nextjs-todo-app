import {
  SignUpRequest,
  SignInParams,
  AuthState,
  ResetPasswordParams,
  ApiResponse,
  User,
} from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession, signIn, SignInResponse, useSession } from "next-auth/react";

const initialState: AuthState = {
  user: null,
  loading: "idle",
  signUpResponse: null,
};

export const registerUserFun = createAsyncThunk<
  ApiResponse,
  SignUpRequest,
  { rejectValue: ApiResponse }
>(
  "auth/registerUserFun",
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

export const forgetPasswordFun = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: ApiResponse }
>(
  "auth/forgetPasswordFun",
  async (email: string, { rejectWithValue }) => {
    try {
      if (!email) {
        return rejectWithValue({
          message: "Email is missing",
          success: false,
        });
      }
      const response: AxiosResponse<ApiResponse> = await axios.post("/api/users/forgetpassword", { email });
      return response.data;
    } catch (error) {
      let axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      } else {
        return rejectWithValue({
          success: false,
          message: 'An unknown error occurred',
        });
      }
    }
  }
);

export const resetPasswordFun = createAsyncThunk<
  ApiResponse,
  ResetPasswordParams,
  { rejectValue: ApiResponse }
>(
  "auth/restPasswordFun",
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
      console.log("response from server is  ", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: `error is ${error.message}`,
        success: false,
      });
    }
  }
);

export const signInUserFun = createAsyncThunk(
  "auth/signInUserFun",
  async (signInData: SignInParams, { rejectWithValue }) => {
    try {
      const response = await signIn("credentials", {
         redirect: false,
        email: signInData.email,
        password: signInData.password,
        callbackUrl: signInData.callbackUrl,
      });
   
      if (response?.error) {
        return rejectWithValue(response?.error);
      }else
     { const session = await getSession();
      if (session?.user) {
        return session.user;
      } else {
        return rejectWithValue("Failed to get user session");
      }}

      // console.log(response)
    } catch (error: any) {
      return rejectWithValue(error?.error || "error occured");
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserFun.pending, (state) => {
        state.loading = "pending";
        state.signUpResponse = null;
      })
      .addCase(registerUserFun.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.signUpResponse = action.payload;
      })
      .addCase(registerUserFun.rejected, (state, action) => {
        state.loading = "failed";
        state.signUpResponse = action.payload;
      })
      .addCase(signInUserFun.rejected, (state, action) => {
        state.user = null;
        state.loading = "failed";
      })
      // .addCase(signInUserFun.pending,(state,action)=>{

      // })
      .addCase(signInUserFun.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = "succeeded";
      })
  },
});
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
