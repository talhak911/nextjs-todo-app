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
import {
  getSession,
  signIn,
  SignInResponse,
  useSession,
} from "next-auth/react";
import { useAppDispatch } from "@/hooks/useStore";

const initialState: AuthState = {
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

// export const updateProfile = createAsyncThunk
// ("todoSlice/updateProfile", async ({image,name,email}: any, { rejectWithValue }) => {
//  try {

//    const response = await axios.put("api/todos/update/list", { listId,title,theme });
//    return response.data;
//  } catch (error) {
//    let errorMessage = "An unknown error occurred";
//    if (axios.isAxiosError(error) && error.response) {
//      errorMessage = error.response.data.message || error.message;
//    }
//    return rejectWithValue(errorMessage);
//  }
// });
export const updateName = createAsyncThunk(
  "todoSlice/updateName",
  async (
    { name, email }: { name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.put(
        "api/users/update/name",
        { name, email }
      );
      return response.data.message;
      //  { const session = await getSession();
      //   if (session?.user && session?.user?.email) {

      //     const userData = await dispatch(fetchUserData(session?.user?.email)).unwrap();
      //     return userData;
      //   }

      //  else {
      //     return rejectWithValue("Failed to get user session");
      //   }}
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
  User,
  string,
  { rejectValue: ApiResponse }
>("auth/fetchUserData", async (email: string, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<User> = await axios.post("/api/users/me", {
      email,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (signInData: SignInParams, { rejectWithValue }) => {
    try {
      // const dispatch = useAppDispatch()
      console.log("sign in crede");
      const response = await signIn("credentials", {
        redirect: false,
        email: signInData.email,
        password: signInData.password,
        callbackUrl: signInData.callbackUrl,
      });
      if (response?.error) {
        return rejectWithValue(response?.error);
      } else {
        const session = await getSession();
      
        if (session?.user && session?.user?.email) {
          return session.user
          // const userData = await dispatch(fetchUserData(session?.user?.email)).unwrap();
          // return userData;
        } else {
          return rejectWithValue("Failed to get user session");
        }
      }

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

      // .addCase(signInUser.pending,(state,action)=>{

      // })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = "succeeded";
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
