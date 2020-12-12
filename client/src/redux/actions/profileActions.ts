import {Dispatch} from "react";
import ApiService from '../../services/api'

export interface getProfileData {
    readonly type : 'GET_PROFILE_DATA'
    payload : any
}
export interface setProfileInProgress {
    readonly type : 'SET_PROFILE_IN_PROGRESS',
    payload : boolean,
}

export type ProfileActions =
    | getProfileData
    | setProfileInProgress

export const onGetProfileData = () => {
    return async (dispatch : Dispatch<ProfileActions>) => {
        try {
            dispatch({type:'SET_PROFILE_IN_PROGRESS',payload:true})
            const response = await ApiService.get('me',{});
            dispatch({type:'GET_PROFILE_DATA',payload:response})
        }
        catch (e) {
            console.log(e)
        }
        finally {
            dispatch({type:'SET_PROFILE_IN_PROGRESS',payload:false})
        }
    }
}

