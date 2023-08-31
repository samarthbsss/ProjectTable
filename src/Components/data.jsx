
import React ,{useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";


export const Data=(props)=>{
    const [projectdata, setprojectdata]= useState();
    const location =useLocation();
    // const getData =()=>{

    // }
    const { item }=location.state;
    const {from} =location.state;
    console.log(item , from);
    console.log(props.location);

    return <>
    <h1 className='heading'>This is the data page</h1>
    <div>
        <table id='maintable'>
            <tbody>
                {/* <caption>helo</caption> */}
                <tr>
                    <th colSpan="2">
                        <h1>Document Required for Quality Dossier From Ndt</h1>
                    </th>
                </tr>{/* </tr> */}
                <tr>
                    <td>
                        <h1>Customer</h1>
                       
                    </td>
                    <td>
                        <h1>Something</h1>

                    </td>
                </tr>
            </tbody>

        </table>

    </div>
    
    </>
}

