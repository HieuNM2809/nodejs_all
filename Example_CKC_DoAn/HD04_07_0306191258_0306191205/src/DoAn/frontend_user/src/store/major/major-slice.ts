import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Major, MajorArray } from "models/major";
import { fetchMajorsAction } from "./major-actions";

const initialMajorState:MajorArray={
    all_majors:[],
    particular_major:{
        _id: "",
        avgStar: 0,
        name: "",
        schoolId:"",
        description:"",
        combineId:{
            _id:0,
            name:""
        },
        studyRoadMap:"",
        careerRoadMap:"",
        image:"",
        schools:""

    }
    ,filter:"",
}

const majorSlice=createSlice({
    name:'major',
    initialState:initialMajorState,
    reducers:{
        setMajors(state,action:PayloadAction<Major[]>){
            state.all_majors=action.payload;
        },
        setParticularMajor(state,action:PayloadAction<Major>){
            state.particular_major=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchMajorsAction.pending,(state,action:any)=>{
     
        });
        
        builder.addCase(fetchMajorsAction.fulfilled,(state,action:any)=>{
            state.all_majors=action.payload;
            // toast.success(`Thêm thành công!` ,{position:"top-right"});
        });
        builder.addCase(fetchMajorsAction.rejected,(state,action:any)=>{
         
        });
    }
    
})
export default majorSlice;