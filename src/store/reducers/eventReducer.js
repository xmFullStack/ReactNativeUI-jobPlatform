import {FETCH_EVENTS, UPDATE_EVENTS, UPDATE_ROLE} from '../action_types';
import {UserRole} from '../../utils/Constants'

const initialState = {
  allEvents: [12,23,34],
  curEvent: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };
      break;
    case UPDATE_EVENTS:
        return {
            ...state,
            curEvent: action.payload
        }
        break;
  
    default :
        return state;
  }
};


export default eventReducer;
