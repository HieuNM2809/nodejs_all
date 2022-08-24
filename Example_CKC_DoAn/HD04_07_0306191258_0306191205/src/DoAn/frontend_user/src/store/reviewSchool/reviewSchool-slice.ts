
import { School, SchoolArray } from '../../models/school';
import {createSlice, PayloadAction} from  "@reduxjs/toolkit";

import { Post, PostArray } from 'models/post';
import { ReviewSchool, SchoolReviewArray } from 'models/schoolReview';


const initialState:SchoolReviewArray={
    all_review_schools:[]
 
}
const reviewSchoolSlice=createSlice({
    name:'reviewSchool',
    initialState:initialState,
    reducers:{
        setReviewSchool(state,action:PayloadAction<ReviewSchool[]>){
            state.all_review_schools=action.payload;
        },
        addReviewSchool(state,action){
            state.all_review_schools.push(action.payload);
        },
    },
 
})
export default reviewSchoolSlice;