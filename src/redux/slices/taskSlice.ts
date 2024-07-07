import { ApiResponse, SignUpRequest } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";



type TaskType ={
    id: string,
    title: string
    isCompleted: boolean;
    listId: string;
}
export type AddTaskType={
  listId:string,
  title:string,
 
}

type TaskSliceType ={
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
}

const initialState:TaskSliceType={
tasks:[],
loading:false,
error:null
}


 export const fetchTasks = createAsyncThunk
 ("todoSlice/fetchTasks", async (listId: string, { rejectWithValue }) => {
  try {
    const response = await axios.post("api/todos/get/tasks", {listId} );
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    }
    return rejectWithValue(errorMessage);
  }
});




export const addTask = createAsyncThunk
("todoSlice/addTask", async ({listId,title,}: AddTaskType, { rejectWithValue }) => {
 try {
   const response = await axios.post("api/todos/add/task", { listId,title });
   return response.data;
 } catch (error) {
   let errorMessage = "An unknown error occurred";
   if (axios.isAxiosError(error) && error.response) {
     errorMessage = error.response.data.message || error.message;
   }
   return rejectWithValue(errorMessage);
 }
});



 const taskSlice = createSlice({
   name: "tasks",
    initialState,
     reducers: {},

   extraReducers: (builder) => {
      builder
    .addCase(fetchTasks.pending, (state) => {
         state.loading = true;
         })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        state.tasks=action.payload
      })
      .addCase(fetchTasks.rejected,(state, action) => {
        state.error=action.payload as string
      })
   

 }});

 export const { } = taskSlice.actions;
 export default taskSlice.reducer;
