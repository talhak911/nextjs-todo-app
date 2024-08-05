import { AddTaskType, TaskSliceType, TaskType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: TaskSliceType = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "taskSlice/fetchTasks",
  async (listId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/todos/get/tasks", { listId });
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

export const addTask = createAsyncThunk(
  "taskSlice/addTask",
  async ({ listId, title }: AddTaskType, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/todos/add/task", {
        listId,
        title,
      });
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

export const updateTask = createAsyncThunk(
  "taskSlice/updateTask",
  async (
    { taskId, status }: { taskId: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put("api/todos/update/task", {
        taskId,
        status,
      });
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
export const deleteTask = createAsyncThunk(
  "taskSlice/updateTask",
  async ({ taskId }: { taskId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete("api/todos/delete/task", {
        data: { taskId },
      });
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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<TaskType[]>) => {
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
