import { configureStore } from "@reduxjs/toolkit";
import combineSlice from "./combine/combine-slice";
import majorSlice from "./major/major-slice";
import postSlice from "./post/post-slice";
import schoolPostsSlice from "./reviewSchool/reviewSchool-slice";
import PostTypeSlice from "./postType/postType-slice";
import schoolSlice from "./school/school-slice";
import searchSlice from "./search/search-slice";
import testSlice from "./test/test-slice";
import reviewSchoolSlice from "./reviewSchool/reviewSchool-slice";

const store= configureStore({
    reducer:{
        school:schoolSlice.reducer,
        major:majorSlice.reducer,
        search:searchSlice.reducer,
        post:postSlice.reducer,
        postTypes:PostTypeSlice.reducer,
        test:testSlice.reducer,
        combine:combineSlice.reducer,
        reviewSchool:reviewSchoolSlice.reducer
    },
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
export default store