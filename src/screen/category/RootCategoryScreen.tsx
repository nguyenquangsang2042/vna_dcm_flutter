import { useSelector} from "react-redux";
import {CategoryScreen} from "./CategoryScreen";
import {DetailCategoryScreen} from "./DetailCategoryScreen";

export const RootCategoryScreen=()=>{
    const {positionStayCategory} = useSelector((state: any) => state.category);
    if (positionStayCategory.length>0) {
        return <DetailCategoryScreen/>;
    } else {
        return <CategoryScreen/>;
    }
}
