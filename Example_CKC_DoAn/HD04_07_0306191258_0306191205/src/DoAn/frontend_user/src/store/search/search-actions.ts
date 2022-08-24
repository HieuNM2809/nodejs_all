import { SchoolResultSearch, MajorResultSearch, SearchKeyWord } from './../../models/searchResult';
import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import searchSlice from "./search-slice";
import SearchService from 'services/search';
import { Search } from 'models/search';

export const searchActions=searchSlice.actions

export const fetchSearchKeyWordSchool=(data:Search):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{

            const response:SearchKeyWord[]=await SearchService.search(data);
            dispatch(searchActions.setSearchKeyWordSchool(response))
    
    }
}
export const fetchSearch = createAsyncThunk(
    'search', async (data:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: SearchKeyWord[] = await SearchService.search(data);

            // dispatch(schoolActions.setSchools(response))
            return response;
        // }
    }
)