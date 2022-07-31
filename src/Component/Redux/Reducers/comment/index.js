import { createSlice } from "@reduxjs/toolkit";

const comment = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    
  },
  reducers: {
    getAllComment(state,action){
        state.comments=action.payload
    },
    addCommentAction(state,action){
        state.comments=[...state.comments,action.payload]
    }
   
  },
});

export const { getAllComment,addCommentAction } = comment.actions;
export default comment.reducer;