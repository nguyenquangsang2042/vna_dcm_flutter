// @ts-ignore
import Animated, {Easing, withSpring, withTiming} from 'react-native-reanimated';

// @ts-ignore
const {
    Value,
    block,
    cond,
    set,
    eq,
    add,
    timing,
    spring,
    Clock,
    startClock,
    stopClock,
    clockRunning,
    not,
    decay,
    diff,
    multiply,
    divide,
    and,
    call
} = Animated;

// @ts-ignore
export const FadeTransition = ({children}) => {
    const opacity = new Value(0);
    const clock = new Clock();
    const config = {
        duration: 300,
        toValue: new Value(1),
        easing: Easing.inOut(Easing.ease),
    };
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };
    const runTiming = block([
        cond(and(eq(state.finished, 0), not(clockRunning(clock))), [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, 0),
            set(state.frameTime, 0),
            set(config.toValue, 1),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(eq(state.finished, 1), [
            stopClock(clock),
            set(state.finished, 0),
            set(opacity, 1),
        ]),
        opacity,
    ]);
    return (
        <Animated.View style={{flex: 1, opacity: runTiming}}>
            {children}
        </Animated.View>
    );
}
