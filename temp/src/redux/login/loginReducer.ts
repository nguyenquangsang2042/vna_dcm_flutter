import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {callLogin} from "services/api/apiProvider";
import {saveCredentials} from "../../utils/asyncStrorage";
import {Alert} from "react-native";
import {isNullOrEmpty} from "../../utils/function";

export const login = createAsyncThunk<
    string,
    { username: string; password: string }
>('login/login', async ({username, password}) => {
    try {
        return await callLogin(username, password);
    } catch (error) {
        // Handle login error and show an alert
        if(!isNullOrEmpty(username)&&!isNullOrEmpty(password))
            Alert.alert("Alert", "Unable to log in, please try again later");
        throw error;
    }
});

export interface AuthState {
    isAuth: boolean;
    error: string | null;
    isLoading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    error: null,
    isLoading: true
};
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        re_init_state_login: (state, action) => {
            state.isAuth = false;
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.isAuth = false;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                state.error = action.error.message || 'Login failed';
                state.isLoading = false;
            });
    },
});
const {reducer} = loginSlice;
export const {re_init_state_login}=loginSlice.actions;
export default reducer;

