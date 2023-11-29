import {Text, View} from "react-native";

// @ts-ignore
export const ValueAttributePdf = ({title, value, showLine}) => {
    return <View style={{marginLeft: 10, marginRight: 10}}>
        <View style={{padding: 5}}>
            <Text>{title}</Text>
        </View>
        <View style={{padding: 5}}>
            <Text style={{color: 'black'}}>{value}</Text>
        </View>
        {showLine && <View style={{padding: 10}}>
            <View style={{width: '100%', backgroundColor: 'grey', height: 1}}/>
        </View>}
    </View>
}
