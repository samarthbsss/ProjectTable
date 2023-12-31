import axios from 'axios';

export const fetchProject =() =>{
    return async(dispatch)=>{
        try {
            const res =await axios.get('api/project');
            dispatch({
                type:"PROJECTNAME",
                payload:res.data
            })
        } catch (error) {
            console.error('Error fetching projects:', error);
            dispatch({
                type:'PRONAMEFAIL',
                payload:error,
            });
        }
    }
}

export const addproject =(project)=>{
    return async(dispatch)=>{
        try {
            const res= await axios.post('api/project', project);
            console.log(res.data);
            dispatch({
                type:'ADDPROJECTNAME',
                payload:res.data
            })
        } catch (error) {
            console.error('Error Adding project:', error);
            dispatch({
                type:'ADDPROJECTFAIL',
                payload:error,
            });
        }
    }
};

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

