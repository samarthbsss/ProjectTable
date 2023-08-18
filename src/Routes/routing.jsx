import React from 'react';
import {Routes, Route} from "react-router-dom";
import { Project } from '../Components/project';
import axios from 'axios';

axios.defaults.baseURL ='http://localhost:8080';
const Routing = () => {
    return <>
    <Routes>
        <Route path='/' element={<Project/>}/>
    </Routes>
    </>;
}
 
export default Routing;