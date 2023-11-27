import { useSelector} from "react-redux";
import {FavoriteScreen} from "./FavoriteScreen";
import {DetailFavoriteScreen} from "./DetailFavoriteScreen";

export const RootFavoriteScreen=()=>{
    const {positionStayFavorite} = useSelector((state: any) => state.favorite);
    if (positionStayFavorite.length>0) {
        return <DetailFavoriteScreen/>;
    } else {
        return <FavoriteScreen/>;
    }
}
