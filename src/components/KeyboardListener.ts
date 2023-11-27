// KeyboardStatusListener.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';
import {setKeyboardStatus} from "../redux/keyboard/reducer";

const KeyboardStatusListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyboardVisibility = (isKeyboardVisible: boolean) => {
            dispatch(setKeyboardStatus(isKeyboardVisible));
        };

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            handleKeyboardVisibility(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            handleKeyboardVisibility(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [dispatch]);

    return null;
}

export default KeyboardStatusListener;
