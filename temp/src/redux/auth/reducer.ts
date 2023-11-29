import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {callLogin, getCurrentUser} from "services/api/apiProvider";
import {saveCurrentUser} from "../../utils/asyncStrorage";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isGetCurrentUser:false
    },
    reducers: {
        auth: state => {
            state.isAuth = true;
        },
        logout: state => {
            state.isAuth = false;
        },
    },
});

export const {auth, logout} = authSlice.actions;
const {reducer} = authSlice;
export default reducer;
