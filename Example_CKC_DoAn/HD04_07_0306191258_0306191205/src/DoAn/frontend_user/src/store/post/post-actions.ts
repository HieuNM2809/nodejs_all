import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import postSlice from "./post-slice";
import {RootState} from '../index';
import { Post } from "models/post";
import PostService from "services/post";
export const postActions=postSlice.actions;
export const fetchPosts=():ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
        if(getState().post.all_posts.length===0){
            const response:Post[]=await PostService.getPosts();
            dispatch(postActions.setPosts(response))
        }
    }
}

export const fetchPostActions = createAsyncThunk(
    'posts', async (dispatch:any, getState:any) => {
        // if (getState().school.all_schools.length === 0) {
            const response: Post[] = await PostService.getPosts();

            // dispatch(schoolActions.setSchools(response))
            return response;
            
        // }
    }
)

export const fetchParticularPost=(post_id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState)=>{
        const response:Post=await PostService.getPost(post_id);
        dispatch(postActions.setParticularPost(response))
    }
}