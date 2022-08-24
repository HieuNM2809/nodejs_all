import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useEffect } from "react";
import { fetchSchools } from "store/school/school-actions";

import List from "./List/List";

const School = () =>{
    const dispatch  = useAppDispatch();
    const data=useAppSelector(state=>state.school.all_schools);
  
    useEffect(()=>{
      dispatch(fetchSchools())
    },[])

    return (<>
    <List data={data}></List>
    </>
       
    )
}
export default School;