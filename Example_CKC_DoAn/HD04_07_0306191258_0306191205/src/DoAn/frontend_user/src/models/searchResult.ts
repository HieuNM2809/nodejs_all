import { SchoolLevel } from './schoolLevel';
import { Region } from './region';
import { School } from './school';

export interface SchoolResultSearch {
    _id: string;
    urlLogo: string;
    name: string;
  
    address:string;
    description:string;
    urlFanpage:string;
    regionId:Region;
    schoolLevelId:School;
    // createdAt: Date;
    // updatedAt: Date;
  }
  export interface SearchKeyWord {
    majors:MajorResultSearch[],
    schools:SchoolResultSearch[],
  }
  export interface MajorResultSearch {
    _id: string;
    benchMark: number;
    name: string;
    schoolId:any;
    description:string;
    combineId:string;
    studyRoadMap:string;
    careerRoadMap:string;
    image:string;

  }
  export interface SearchResultArray {
    search_keyword:any,
   search_keyword_school: SchoolResultSearch[],
   search_keyword_major: MajorResultSearch[],
   search_school:SchoolResultSearch[]
  }