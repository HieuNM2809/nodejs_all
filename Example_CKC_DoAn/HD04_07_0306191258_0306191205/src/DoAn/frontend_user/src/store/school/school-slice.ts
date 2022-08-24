
import { School, SchoolArray } from '../../models/school';
import {createSlice, PayloadAction} from  "@reduxjs/toolkit";
import { fetchSchoolsAction, fetchSchoolsOutStanding } from './school-actions';


const initialSchoolState:SchoolArray={
    all_schools:[],
    particular_school:{
        _id: "",
        urlLogo: "",
        name: "",

        address:"",
        description:"",
        urlFanpage:"",
        regionId: "",
        // regionId:"",
        schoolLevelId:"",
        urlHomePage:"",
        images:"",
        majors:"",

    },
    all_schools_outstanding:[],
    
}
const schoolSlice=createSlice({
    name:'school',
    initialState:initialSchoolState,
    reducers:{
        setSchools(state,action:PayloadAction<School[]>){
            state.all_schools=action.payload;
        },
        setParticularSchool(state,action:PayloadAction<School>){
            state.particular_school=action.payload;
        }
    },
    extraReducers:(builder)=>{
   
        builder.addCase(fetchSchoolsAction.pending,(state,action:any)=>{
          
        });
        builder.addCase(fetchSchoolsAction.fulfilled,(state,action:any)=>{
            state.all_schools=action.payload;
        });
        builder.addCase(fetchSchoolsAction.rejected,(state,action:any)=>{
           
        });

        builder.addCase(fetchSchoolsOutStanding.pending,(state,action:any)=>{
          
        });
        builder.addCase(fetchSchoolsOutStanding.fulfilled,(state,action:any)=>{
            state.all_schools_outstanding=action.payload;
        });
        builder.addCase(fetchSchoolsOutStanding.rejected,(state,action:any)=>{
           
        });
        
     
    }
})
export default schoolSlice;