
import {createSlice, PayloadAction} from  "@reduxjs/toolkit";



import { useAppDispatch } from 'hooks/redux-hooks';
import { OptionItemArray } from "models/general";
import { fetchSchools } from 'store/school/school-actions';

  
const initialPostTypeState:OptionItemArray={
    all_options:[],
    particular_option:{
        _id: "",
        name: "",
    }
    ,status:""
}
const PostTypeSlice=createSlice({
    name:'postType',
    initialState:initialPostTypeState,
    reducers:{
        // setPostTypes(state,action:PayloadAction<SchoolLevel[]>){
        //     state. all_options=action.payload;
        // },
        setPostTypes(state,action:any){
            state.all_options=action.payload;
        },
   
    },

    extraReducers:(builder)=>{
        // builder.addCase(fetchPostTypesAction.pending,(state,action:any)=>{
        //    state.status="false";
        // });
        // builder.addCase(fetchPostTypesAction.fulfilled,(state,action:any)=>{
        //     state.all_options=action.payload;
        // });
        // builder.addCase(fetchPostTypesAction.rejected,(state,action:any)=>{
        //     state.status="true";
        // });
  
    }
})

export default PostTypeSlice;