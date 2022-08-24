import AdminPage from 'pages/Admin';
import School from 'pages/Admin/School';
import DetailMajor from 'pages/DetailMajor';
import DetailMajorSchool from 'pages/DetailMajorSchool';
import DetailPost from 'pages/DetailPost';
import Post from 'pages/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import DetailSchool from '../pages/DetailSchool';
import Home from '../pages/Home';
import MBTI from '../pages/MBTI';
import { routes } from './routes';
const Routers = () => {
        return (<Routes>
                <Route path='/' element={<Home />}>

                </Route>
                <Route path='/school/:id' element={<DetailSchool />}>

                </Route>
                <Route path='/major/:id' element={<DetailMajor />}>

                </Route>
                <Route path='/major/:schoolId/:majorId' element={<DetailMajorSchool />}>

                </Route>
                {/* <Route path="/school/:id" render={(props) => <DetailSchool {...props} />}/>  */}
                <Route path='/test' element={<MBTI />}>



                </Route>
                <Route path='/post' element={<Post />}>




                </Route>
                <Route path='/post/:id' element={<DetailPost />}>

</Route>
      
                <Route
                        path="*"
                        element={
                                <NotFound></NotFound>
                        }
                />

        </Routes>

        )
}
export default Routers