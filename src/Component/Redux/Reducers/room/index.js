import { createSlice } from "@reduxjs/toolkit";

const room = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    
  },
  reducers: {
    getAllRooms(state,action){
state.rooms=action.payload
    },
    deleteRoom(state,action){
        state.rooms=state.rooms.filter((element)=>{
            return element._id!==action.payload
        })
    },
    addRoom(state,action){
        state.rooms=[action.payload,...state.rooms]
    }
   
  },
});

export const {getAllRooms,deleteRoom,addRoom  } = room.actions;
export default room.reducer;
