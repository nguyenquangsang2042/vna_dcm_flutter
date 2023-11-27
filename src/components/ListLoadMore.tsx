import React, {useEffect, useState, useCallback} from "react";
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {useSelector} from "react-redux";
import {NoDataView} from "components/index";
import {arrayIsEmpty} from "../utils/function";

// @ts-ignore
export const ListLoadMore = ({callData, ItemRenderFlatlist, limit, enableMoreData, numColumn}) => {
    const [data, setData] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(enableMoreData);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái "refreshing"
    // @ts-ignore
    const {isConnected} = useSelector((state) => state.netInfo);
    const onDeleteItem = (index: number) => {
        // Remove the item at the specified index
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    useEffect(() => {
        fetchData();
    }, [isLoadingMore, isConnected]);

    const fetchData = useCallback(async () => {
        try {
            if (!isConnected) {
                setIsLoadingMore(false);
                setIsRefreshing(false);
            }

            const newData = await callData(limit, offset, isConnected);
            if (newData == undefined || (newData.length === 0 || newData.length < limit)) {
                // Nếu số lượng item trả về ít hơn limit hoặc bằng 0
                if(data.length!=0)
                {
                    // @ts-ignore
                    setData((prevData) => [...prevData, ...newData]);
                }
                else
                {
                    setData(newData);
                }
                setHasMoreData(false);
            } else {
                // @ts-ignore
                setData((prevData) => [...prevData, ...newData]);
                setOffset((prevOffset) => prevOffset + limit);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingMore(false);
            setIsRefreshing(false); // Khi kết thúc "refresh", cần đặt lại trạng thái
        }
        setIsLoading(false)

    }, [offset, isConnected]);

    const handleRefresh = useCallback(() => {
        setOffset(0); // Đặt lại offset để làm mới toàn bộ danh sách
        setIsLoading(true);
        setIsRefreshing(true);
        setHasMoreData(true); // Đặt lại trạng thái có thêm dữ liệu
        setData([]); // Xóa dữ liệu hiện tại
        fetchData(); // Gọi lại fetchData để tải dữ liệu mới
    }, []);

    return (
        <View style={{flex: 1}}>
            {
                data != null && data.length > 0 && !isLoading ? <FlatList
                    numColumns={numColumn}
                    initialNumToRender={15}
                    data={data}
                    renderItem={({item, index}) => (
                        <ItemRenderFlatlist item={item} index={index} onDeleteItem={onDeleteItem}/>
                    )}
                    onEndReachedThreshold={0.1}
                    // @ts-ignore
                    ListFooterComponent={isLoadingMore && (
                        <ActivityIndicator size="large" color="#0000ff"/>
                    )}
                    onEndReached={() => {
                        if (hasMoreData && !isLoadingMore) {
                            setIsLoadingMore(true);
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={["#0000ff"]} // Màu sắc của chỉ báo "refresh"
                            tintColor={"#0000ff"} // Màu sắc của chỉ báo "refresh"
                        />
                    }
                /> : (isLoading ?
                    <ActivityIndicator size="large" color="#0000ff"/> :
                    <NoDataView/>)
            }
        </View>
    );
};
