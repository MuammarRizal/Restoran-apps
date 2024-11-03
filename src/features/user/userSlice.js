import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    table: "",
    status: "idle",
  },
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateTable(state, action) {
      state.table = action.payload;
    },
  },
});
export const { updateName, updateTable } = userSlice.actions;
export default userSlice.reducer;
