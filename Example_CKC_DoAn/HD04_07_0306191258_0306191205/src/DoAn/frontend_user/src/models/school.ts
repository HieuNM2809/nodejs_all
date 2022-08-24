
export interface School {
    _id: string;
    urlLogo: string;
    name: string;
  
    address:string;
    description:string;
    urlFanpage:string;
    urlHomePage:string;
    regionId:any;
    schoolLevelId:any;
    images?:any;
    majors?:any;
    // createdAt: Date;
    // updatedAt: Date;
  }

  export interface SchoolOutStanding {
    _id: string;
    urlLogo: string;
    name: string;
    description:string; 
    urlFanpage:string;
    urlHomepage:string;
    address:string;
  

    regionId:any;
    schoolLevelId:any;
    avgStar?:number;
    totalRating?:number;
    // images:any;
    // majors?:any;
    // createdAt: Date;
    // updatedAt: Date;
  }
  export interface SchoolArray {
    all_schools:School[],
    particular_school:School,
    all_schools_outstanding:SchoolOutStanding[],
  }