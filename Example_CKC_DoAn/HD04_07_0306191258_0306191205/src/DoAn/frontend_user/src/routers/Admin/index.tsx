import NotFound from 'components/NotFound';
import AdminPage from 'pages/Admin';
import School from 'pages/Admin/School';
import Home from 'pages/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const RoutersAdmin = () => {
        return (<Routes>
                <Route path='/Admin' element={<AdminPage />}>
         
               
            {/* <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} /> */}
          </Route>
          <Route path="/Admin/school" element={<School />}>
                </Route>
                {/* <Route path="/Admin/school/:id" element={<School />}>
                </Route> */}

             <Route
                        path="*"
                        element={
                                <NotFound></NotFound>
                        }
                /> 

        </Routes>

        )
}
export default RoutersAdmin