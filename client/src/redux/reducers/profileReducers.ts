import {ProfileActions} from "../actions/profileActions";

type ProfileState = {
    inProgress : boolean,
    id : number | undefined,
    email: string,
    name : string,
    phone : string,
    products : any[],
    userName : string
}

const initialState = {
    inProgress: false,
    id: undefined,
    email : '',
    name: '',
    phone: '',
    products : [],
    userName: '',
}

const ProfileReducer = (state : ProfileState = initialState,action : ProfileActions) =>{
    switch (action.type) {
        case "SET_PROFILE_IN_PROGRESS":
            return {
                ...state,
                inProgress:action.payload
            }
        case "GET_PROFILE_DATA":
            return {
                ...state,
                email:action.payload.email,
                id : action.payload.id,
                name : action.payload.name,
                phone : action.payload.phone,
                userName :action.payload.userName,
                products : action.payload.products,
            }

        default:
            return state
    }
}

export {ProfileReducer}
