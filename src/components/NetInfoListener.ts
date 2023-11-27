import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnectionStatus } from '../redux/net_info/reducer';
import NetInfo from "@react-native-community/netinfo";
import {Alert} from "react-native";

const NetInfoListener=()=> {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            dispatch(setConnectionStatus(state.isConnected));
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    return null;
}

export default NetInfoListener;
