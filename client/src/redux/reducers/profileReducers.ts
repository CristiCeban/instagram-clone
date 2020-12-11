import {ProfileActions} from "../actions/profileActions";

type ProfileState = {
    inProgress : boolean
}

const initialState = {
    inProgress: false,
}

const ProfileReducer = (state : ProfileState = initialState,action : ProfileActions) =>{
    switch (action.type) {
        case "SET_PROFILE_IN_PROGRESS":
            return {
                ...state,
                inProgress:action.payload
            }


        default:
            return state
    }
}

export {ProfileReducer}
