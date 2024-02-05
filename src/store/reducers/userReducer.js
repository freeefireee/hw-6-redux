import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (payload, thunkApi) => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response : err.message);
  }
});

export const deleteUsers = createAsyncThunk("users/deleteUse", async (payload, thunkApi) => {
  try {
    await api.deleteUser(payload);
    return payload;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response : err.message);
  }
});

export const createUsers = createAsyncThunk("users/createUse", async (payload, thunkApi) => {
  try {
    const response = await api.createUser(payload);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response ? err.response : err.message);
  }
});

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchAllUsers.fulfilled:
      return {
        ...state,
        users: action.payload,
      };
    case deleteUsers.fulfilled:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case createUsers.fulfilled:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
