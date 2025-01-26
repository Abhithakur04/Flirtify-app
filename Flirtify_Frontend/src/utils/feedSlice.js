import { createSlice } from "@reduxjs/toolkit";

// we can add feed data using addFeed and remove the data from removeFeed
const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action) => {
            return action.payload ;
        },
        removeUserFromFeed:(state,action) => {
            const newFeed=state.filter(user => user._id!==action.payload);
            return newFeed;
        }
    }
})
export const {addFeed,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;