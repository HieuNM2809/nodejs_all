import { PostService } from '../../services/post';
import { SchoolService } from 'services/school';

import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import {RootState} from '../index';
import { School, SchoolOutStanding } from "models/school";
import { ReviewSchool, SchoolReview } from 'models/schoolReview';
import schoolPostsSlice from './reviewSchool-slice';
import { Post } from 'models/post';
import SchoolReviewService from 'services/schoolReview';
import reviewSchoolSlice from './reviewSchool-slice';


export const reviewSchoolActions=reviewSchoolSlice.actions

export const fetchReviewSchool=(id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
        if(getState().reviewSchool.all_review_schools.length===0){
            const response:ReviewSchool[]=await SchoolReviewService.getSchoolReviews(id);
            dispatch(reviewSchoolActions.setReviewSchool(response))
        }
    }
}
export const addReviewSchoolAction=(id:string,data:any):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
      
            const response:ReviewSchool[]=await SchoolReviewService.Review(id,data);
            dispatch(reviewSchoolActions.addReviewSchool(response))
        
    }
}
// export const fetchSchoolPosts = createAsyncThunk(
//     'reviewSchool', async (id:string) => {
//         // if (getState().school.all_schools.length === 0) {
//             const response:ReviewSchool = await SchoolReviewService.getSchoolReviews(id)
//          return response;
//         // }
//     }
// )
