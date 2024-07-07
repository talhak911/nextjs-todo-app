import { ApiResponse, SignUpRequest } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";


type ListType ={
    id:string
    theme:string,
    title:string,
    userEmail:string
}


type TodosType ={
  lists: ListType[];
  loading: boolean;
  error: string | null;
}

const initialState:TodosType={
lists:[],
loading:false,
error:null
}


 export const fetchLists = createAsyncThunk
 ("todoSlice/fetchLists", async (email: string, { rejectWithValue }) => {
  try {
    const response = await axios.post("api/todos/get/lists", { email: email });
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    }
    return rejectWithValue(errorMessage);
  }
});


export type AddListType={
  email:string,
  title:string,
  theme:string
}


export const addList = createAsyncThunk
("todoSlice/addList", async ({email,title,theme}: AddListType, { rejectWithValue }) => {
 try {
   const response = await axios.post("api/todos/add/list", { email,title,theme });
   return response.data;
 } catch (error) {
   let errorMessage = "An unknown error occurred";
   if (axios.isAxiosError(error) && error.response) {
     errorMessage = error.response.data.message || error.message;
   }
   return rejectWithValue(errorMessage);
 }
});



 const listSlice = createSlice({
   name: "lists",
    initialState,
     reducers: {},

   extraReducers: (builder) => {
      builder
    .addCase(fetchLists.pending, (state) => {
         state.loading = true;
         })
      .addCase(fetchLists.fulfilled, (state, action: PayloadAction<ListType[]>) => {
        state.lists=action.payload
      })
      .addCase(fetchLists.rejected,(state, action) => {
        state.error=action.payload as string
      })
   

 }});

 export const { } = listSlice.actions;
 export default listSlice.reducer;
