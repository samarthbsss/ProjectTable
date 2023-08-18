
import { combineReducers } from 'redux';


const intial=[];

const projectReducer=(state=intial, action)=>{
    switch(action.type){
        case 'PROJECTS' :
            return action.payload;
        case 'PROFAIL':
            return action.payload;
        case 'ADDPROJECT' :
            return [...state, action.payload];
       case 'ADDFAIL' :
             return action.payload;
             case 'DELETEPROJECT' :
                return state.filter((data) => data._id !== action.payload);
           case 'DELETEFAIL' :
                 return action.payload;
        default :
             return state;
  }
}


const rootReducer = combineReducers({
    data:projectReducer
})

export default rootReducer;