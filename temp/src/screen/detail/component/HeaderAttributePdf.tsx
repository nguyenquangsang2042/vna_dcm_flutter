import {Image, Text, View} from "react-native"

// @ts-ignore
export const HeaderAttributePdf=({title})=>{
    return <View>
        <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
            <View style={{padding:5}}>
                <Image source={require('assets/images/icon_golden_drop_down.png')} resizeMode={"stretch"} style={{height:10,width:20}}/>
            </View>
            <Text style={{
                color:'black',
                fontFamily: 'heritage_bold',
                lineHeight: 20,
                marginTop:10
            }}>{title}</Text>

        </View>
        <View style={{backgroundColor:'grey',width:'100%',height:1}}/>
    </View>
}
