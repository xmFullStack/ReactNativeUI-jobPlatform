import { FETCH_EVENTS, UPDATE_EVENTS, UPDATE_ROLE } from './action_types'
import RestAPI from '../utils/RestAPI'


export const updateRole = (role)=>{
    return {
        type: UPDATE_ROLE,
        payload: role
    }
}

export const updateEvent = (eventId)=>{

    return {
        type: UPDATE_EVENTS,
        payload: eventId
    }
}



export const fetchEvents  =()=>{
    return (dispatch)=>{

        RestAPI.generalPost('style/list')
        .then(res=>{
            dispatch({
                type: FETCH_EVENTS,
                payload: data
            })
        })
        .catch(ex=>{
            console.log(ex)
        })
        // fetch('style/list')
        // .then(response=>response.json())
        // .then(data=>{
            
        // })
        // .catch(ex=>{
        //     console.log(ex)
        // })
    }
}