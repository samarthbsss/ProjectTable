import React from 'react';
import {Routes, Route} from "react-router-dom";
import { Project } from '../Components/project';
import Main from '../Components/pro';
import axios from 'axios';

axios.defaults.baseURL ='https://adorable-swimsuit-hare.cyclic.cloud';
const Routing = () => {
    return <>
    <Routes>
        <Route path='/' element={<Project/>}/>
        <Route path='/hi' element={<Main/>}/>   
    </Routes>
    </>;
}
 
export default Routing;