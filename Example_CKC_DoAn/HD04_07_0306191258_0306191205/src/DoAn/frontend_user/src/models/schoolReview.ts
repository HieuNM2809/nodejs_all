
export interface SchoolReview {
    _id: string;
    schoolId:string;
    comment:string;
    star:number;

   
  }
  export interface CreateSchoolReview {
    comment:string;
    star:number;
  }

  export interface ReviewSchool {
    _id: string;
    title: string;
    content: string;
    schoolId:any;
    postTypeId:any;
    images:any;
  }

  export interface SchoolReviewArray {
    all_review_schools:ReviewSchool[],
  
  }