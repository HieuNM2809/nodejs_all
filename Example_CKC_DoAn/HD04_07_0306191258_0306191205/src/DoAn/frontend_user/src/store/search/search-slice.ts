
import { SchoolResultSearch, MajorResultSearch, SearchKeyWord } from './../../models/searchResult';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultArray } from "models/searchResult";
import { fetchSearch } from './search-actions';

const initialSearchState:SearchResultArray={
    search_keyword:[],
    search_keyword_school:[],
    search_keyword_major:[],
    search_school:[]
    // all_schools:[],
    // particular_school:{
    //     _id: "",
    //     urlLogo: "",
    //     name: "",

    //     address:"",
    //     description:"",
    //     urlFanpage:"",
    //     regionId: "",
    //     // regionId:"",
    //     schoolLevelId:"",

    // }
}
const searchSlice=createSlice({
    name:'search',
    initialState:initialSearchState,
    reducers:{
        setSearchKeyWordSchool(state,action:PayloadAction<SearchKeyWord[]>){
            state.search_keyword=action.payload;
        },
        setSearchKeyWordMajor(state,action:PayloadAction<MajorResultSearch[]>){
            state.search_keyword_major=action.payload;
        },
        setSearchSchool(state,action:PayloadAction<SchoolResultSearch[]>){
            state.search_school=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSearch.pending,(state,action:any)=>{
       
        });
        builder.addCase(fetchSearch.fulfilled,(state,action:any)=>{
            state.search_keyword=action.payload;
        });
        builder.addCase(fetchSearch.rejected,(state,action:any)=>{
          
        });
  
    }

})

export default searchSlice;