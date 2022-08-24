import { fetchSchools } from 'store/school/school-actions';


import { AnyAction, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from "store";

import SchoolLevelService from 'services/schoolLevel';

import { useAppDispatch } from 'hooks/redux-hooks';
import postTypeSlice from './postType-slice';
import PostTypeService from 'services/postType';
import { OptionItem } from 'models/general';


export const postTypeActions=postTypeSlice.actions
export const fetchPostTypes=():ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch,getState) =>{
        if(getState().postTypes.all_options.length===0){
            const response:OptionItem[]=await PostTypeService.getPostTypes();
            dispatch(postTypeActions.setPostTypes(response))
        }
    }
}



// export const fetchParticularPost=(post_id:string):ThunkAction<void,RootState,unknown,AnyAction>=>{
//     return async(dispatch,getState)=>{
//         const response:Post=await PostService.getPost(post_id);
//         dispatch(postActions.setParticularPost(response))
//     }
// }



// export const fetchPostTypesAction = createAsyncThunk(
//     'postTypes', async (dispatch:any, getState:any) => {
//         // if (getState().school.all_schools.length === 0) {
//             const response: OptionItem[] = await PostTypeService.getPostTypes();

//             // dispatch(schoolActions.setSchools(response))
//             return response;
//         // }
//     }
// )



