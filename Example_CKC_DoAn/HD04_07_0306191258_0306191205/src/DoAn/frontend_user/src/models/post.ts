export interface Post {
    _id: string;
    title: string;
    content: string;
    schoolId:any;
    postTypeId:any;
    images:any;
  }

  
  export interface PostArray {
    all_posts:Post[],
    particular_post:Post,
    filter:any,
 
  }