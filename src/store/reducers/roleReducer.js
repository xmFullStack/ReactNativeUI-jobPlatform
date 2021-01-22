import { UPDATE_ROLE} from '../action_types';
import {UserRole} from '../../utils/Constants'

const initialState = {
  curRole: null,
  
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case UPDATE_ROLE:
        return {
            ...state,
            curRole: action.payload
        }
        break;
    default :
        return state;
  }
};


export default roleReducer;
