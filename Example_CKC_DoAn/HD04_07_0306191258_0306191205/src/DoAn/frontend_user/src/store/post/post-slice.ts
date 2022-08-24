import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostArray } from './../../models/post';
import { fetchPostActions } from './post-actions';
const initialPostState:PostArray={
    all_posts:[],
    particular_post:{
        _id: "",
        title: "",
        content:"",
        schoolId:"",
        postTypeId: "",
        images:""
    },
    filter:null,
 
}
const postSlice=createSlice({
    name:'post',
    initialState:initialPostState,
    reducers:{
        setPosts(state,action:PayloadAction<Post[]>){
            state.all_posts=action.payload;
        },
        setParticularPost(state,action:PayloadAction<Post>){
            state.particular_post=action.payload;
        },
        projectFilter (state, action:any) {
            state.all_posts = action.payload._id;
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostActions.pending,(state,action:any)=>{
     
        });
        builder.addCase(fetchPostActions.fulfilled,(state,action:any)=>{
            state.all_posts=action.payload;
        });
        builder.addCase(fetchPostActions.rejected,(state,action:any)=>{
       
        });
  
    }
})
export const {  projectFilter } = postSlice.actions;
export default postSlice;