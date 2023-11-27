import { useSelector} from "react-redux";
import {StandardDocScreen} from "./StandardDocScreen";
import { Text } from "react-native";
import {DetailStandarDocScreen} from "./DetailStandardDocScreen";

export const RootStandardDocScreen=()=>{
    const {positionStayStandardDoc} = useSelector((state: any) => state.standard_doc);
    if (positionStayStandardDoc.length>0) {
        return <DetailStandarDocScreen/>;
    } else {
        return <StandardDocScreen/>;
    }
}
