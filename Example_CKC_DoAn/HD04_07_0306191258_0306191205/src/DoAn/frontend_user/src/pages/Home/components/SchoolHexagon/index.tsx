import { Grid } from '@mui/material';
import Loading from 'components/Backdrop';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMajors, fetchMajorsAction } from 'store/major/major-actions';
import images from '../../../../config/images';
import { Major } from '../../../../models/major';
import MajorService from '../../../../services/major';
import classes from './styles.module.scss';
const SchoolHexagon = () => {

  const dispatch = useAppDispatch();
  // const allMajors = useAppSelector(state => state.major.all_majors);
  const [allMajors,setAllMajor]=useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    MajorService.getMajorOutStanding().then((res)=>{
      setAllMajor(res)
      setIsLoading(false)
    })

  }, [])


  return ( <Grid> {isLoading?<Loading/>:
    <div className={classes.grid} >
      <ul id={classes.hexGrid}>
        {allMajors.map((maj, index) => (
          <li className={classes.hex} key={index}>
            <div className={classes.hexIn} >
              <Link className={classes.hexLink}  to={`/major/${maj._id}`}>
                <div className={classes.img}>
                  <img src={maj.image} />
                </div>

             
           <p id={classes.demo2}>{maj.name}   </p>
             
              </Link>
            </div>
          </li>
        ))}


      </ul>
    </div>}</Grid>
  )
}
export default SchoolHexagon;