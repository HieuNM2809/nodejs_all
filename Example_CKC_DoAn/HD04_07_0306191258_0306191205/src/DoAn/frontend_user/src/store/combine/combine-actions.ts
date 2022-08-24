
import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { OptionItem } from "models/general";

import CombineService from "services/combine";
import MajorService from "services/major";
import { RootState } from "store";
import combineSlice from "./combine-slice";




export const combineActions = combineSlice.actions

export const fetchCombines = createAsyncThunk(
    'combines', async (dispatch:any, getState:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: OptionItem[] = await CombineService.getCombines();

            // dispatch(schoolActions.setSchools(response))
            return response;
        // }
    }
)


    