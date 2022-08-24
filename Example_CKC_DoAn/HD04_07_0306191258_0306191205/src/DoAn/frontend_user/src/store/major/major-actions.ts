import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { Major } from "models/major";
import MajorService from "services/major";
import { RootState } from "store";
import majorSlice from "./major-slice";

export const majorActions=majorSlice.actions

export const fetchMajors=():ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
        if(getState().major.all_majors.length===0){
            const response:Major[]=await MajorService.getMajors();

            dispatch(majorActions.setMajors(response))
        }
    }
}
export const fetchParticularMajor=(major_id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState)=>{
        const response:Major=await MajorService.getMajor(major_id);
        dispatch(majorActions.setParticularMajor(response))
    }
}
export const fetchMajorsAction = createAsyncThunk(
    'majors', async (dispatch:any, getState:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: Major[] = await MajorService.getMajors();

            // dispatch(schoolActions.setSchools(response))
            return response;
        // }
    }
)