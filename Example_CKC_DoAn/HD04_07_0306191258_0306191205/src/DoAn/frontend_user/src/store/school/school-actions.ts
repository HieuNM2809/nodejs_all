import { SchoolService } from 'services/school';
import schoolSlice from "./school-slice";
import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import {RootState} from '../index';
import { School, SchoolOutStanding } from "models/school";


export const schoolActions=schoolSlice.actions

export const fetchSchools=():ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
        if(getState().school.all_schools.length===0){
            const response:School[]=await SchoolService.getSchools();
            dispatch(schoolActions.setSchools(response))
        }
    }
}
export const fetchSchoolsAction = createAsyncThunk(
    'schools', async (dispatch:any, getState:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: School[] = await SchoolService.getSchools();
         return response;
        // }
    }
)
export const fetchSchoolsOutStanding = createAsyncThunk(
    'schoolsOutStanding', async (dispatch:any, getState:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: SchoolOutStanding[] = await SchoolService.getSchoolsOutStanding();
         return response;
        // }
    }
)

export const fetchParticularSchool=(school_id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState)=>{
        const response:School=await SchoolService.getSchool(school_id);
        dispatch(schoolActions.setParticularSchool(response))
    }
}