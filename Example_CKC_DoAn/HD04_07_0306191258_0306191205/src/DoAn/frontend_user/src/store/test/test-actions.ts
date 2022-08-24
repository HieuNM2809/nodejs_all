import { RegionService } from './../../services/region';
import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from "store";

import TestService from 'services/test';
import testSlice from './test-slice';
import { Test } from 'models/test';

export const testActions=testSlice.actions

export const fetchParticularTest=(test_id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState)=>{
        const response:Test=await TestService.getTest(test_id);
        dispatch(testActions.setParticularTest(response))
    }
}
// export const fetchTestActions = createAsyncThunk(
//     'tests', async (dispatch:any, getState:any) => {
//         // if (getState().school.all_schools.length === 0) {
//             const response: Test[] = await TestService.getTests();

//             // dispatch(schoolActions.setSchools(response))
//             return response;
//         // }
//     }
// )



       