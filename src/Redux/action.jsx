import axios from 'axios';

export const fetchData = () => {
    return async(dispatch)=>{
        try {
            const res = await axios.get('api/data');
            
            dispatch({
                type:"PROJECTS",
                payload:res.data

            });
            // console.log("from action", res);
        } catch (error) {
            console.error('Error fetching projects:', error);
            dispatch({
                type:'PROFAIL',
                payload:error,
            });
        }
    }
  };

export const addData =(project)=>{
    return async(dispatch)=>{
        try {
            const res= await axios.post('api/data', project);
            console.log(res.data);
            dispatch({
                type:'ADDPROJECT',
                payload:res.data
            })
        } catch (error) {
            console.error('Error Adding project:', error);
            dispatch({
                type:'ADDFAIL',
                payload:error,
            });
        }
    }
};

export const deleteData =(index)=>{
    return async(dispatch)=>{
        try {
            const res = await axios.delete(`api/data/${index}`);
            dispatch({
                type:'DELETEPROJECT',
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:'DELETEFAIL',
                payload:error,
            })
            
        }
    }
}