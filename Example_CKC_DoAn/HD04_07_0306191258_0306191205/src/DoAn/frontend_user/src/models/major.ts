import { Combine } from './combine';
import { School } from "./school";

export interface Major {
    _id: string;
    avgStar:number;
    name: string;
    schoolId:any;
    description:string;
    combineId:Combine;
    studyRoadMap:any;
    careerRoadMap:any;
    image:string;
    schools:any;
   
  }
  export interface MajorCompleTest {
    _id: string;
    majorId:any;
    schoolId:any;
   
  }
  export interface MajorSchool {
    _id: string;
    benchMark: number;
    outputStandard: string;
    schoolId:any;
    majorId:any;
    detailedOutline:string;
    freshman:string;
    sophomore:string;
    junior:string;
    senior:string;
  }
  export interface MajorSchoolReview {
    _id: string;
    comment:string;
    star:number;
  }
  export interface MajorArray {
    all_majors:Major[],
    particular_major:Major,
    filter:any;
  }