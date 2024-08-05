import {
  ListType,
  ListSliceType,
  AddListType,
  UpdateListType,
} from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ListSliceType = {
  lists: [],
  loading: false,
  error: null,
};

export const fetchLists = createAsyncThunk(
  "todoSlice/fetchLists",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/todos/get/lists", {
        email: email,
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

export const addList = createAsyncThunk(
  "todoSlice/addList",
  async ({ email, title, theme }: AddListType, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/todos/add/list", {
        email,
        title,
        theme,
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
export const updateList = createAsyncThunk(
  "todoSlice/updateList",
  async ({ listId, title, theme }: UpdateListType, { rejectWithValue }) => {
    try {
      const response = await axios.put("api/todos/update/list", {
        listId,
        title,
        theme,
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

export const deleteList = createAsyncThunk(
  "todoSlice/deleteList",
  async ({ listId }: { listId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete("api/todos/delete/list", {
        data: { listId },
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

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchLists.fulfilled,
        (state, action: PayloadAction<ListType[]>) => {
          state.lists = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchLists.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const {} = listSlice.actions;
export default listSlice.reducer;
