import { SignUpForm, SignUpResponse, SignUpState } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";


export const registerUser = createAsyncThunk<SignUpResponse, SignUpForm, {
    rejectValue: string}
    >(
    'auth/registerUser',
    async (registerData: SignUpForm, { rejectWithValue }) => {
      const { name, email, password, confirmPassword } = registerData;
    
    if (!name || !email || !password || !confirmPassword) {
      return rejectWithValue("All fields are required.");
    }

    if (password !== confirmPassword) {
      return rejectWithValue("Passwords do not match.");
    }
      try {
        const response : AxiosResponse<SignUpResponse>= await axios.post('/api/users/signup', registerData);
        return response.data as SignUpResponse;
      } catch (error:any) {
        return rejectWithValue(`${error.response.data}`);
      }
    }
  );
  

const initialState:SignUpState={
    signUpform:{
        name: '',
        email:'',
        password:'',
        confirmPassword: ''
    },
    loading:'idle',
    error:null
}

export const signUpSlice = createSlice({
    name: "signUpSlice",
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof SignUpForm; value: string }>) => {
            const { field, value } = action.payload;
            state.signUpform[field] = value;
          },
        resetForm: () => initialState
      },
      extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.loading = "pending";
          })
          .addCase(
            registerUser.fulfilled,
            (state, action: PayloadAction<SignUpResponse>) => {
              state.loading = "succeeded"; 
              state.error = null; 
            }
          )
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = "failed"; 
            state.error = action.payload as string;
          });
      },
    });
    export const { updateField ,resetForm} = signUpSlice.actions;
    export default signUpSlice.reducer
