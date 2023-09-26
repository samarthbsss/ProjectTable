import React from 'react';
import {Routes, Route} from "react-router-dom";
import { Project } from '../Components/project';
import Main from '../Components/pro';
import axios from 'axios';
import Search from '../Components/search';
import { Data } from '../Components/data';
// import SearchBar from '../Components/use';

axios.defaults.baseURL ='https://adorable-swimsuit-hare.cyclic.cloud';
// axios.defaults.baseURL ='http://localhost:8080';

const Routing = () => {
    return <>
    <Routes>
        <Route path='/' element={<Search/>}/>
        {/* <Route path='/test' element={<Project/>}/> */}
        {/* <Route path='/project' element={<Main/>}/>    */}
        <Route path='/data/' element ={<Data/>}/>
        {/* <Route path='/search' element ={<SearchBar/>}/> */}
    </Routes>
    </>;
}
 
export default Routing;