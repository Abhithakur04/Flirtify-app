import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests:(state,action) =>action.payload,
        removeRequests:(state,action)=>{
            const newarray=state.filter((req)=>{
                req._id!==action.payload
            });
            return newarray;

        }
    },
});
export const {addRequests,removeRequests}=requestSlice.actions;
export default requestSlice.reducer;