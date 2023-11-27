import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {FlatList} from "react-native-gesture-handler";
import {Text, View} from "react-native";

const ShimmerList = () => {
    // Generate an array of 5 items for the FlatList
    const data = Array.from({ length: 5 }, (_, index) => ({ key: index.toString() }));

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <View>
                    <ShimmerPlaceholder
                        style={{ marginBottom: 5, marginHorizontal: 20, borderRadius: 10 }}
                        shimmerStyle={{  width: 160,
                            height: 200, borderRadius: 10 }}
                    >
                        <View style={{ backgroundColor: 'gray', width: '100%', height: 100, borderRadius: 10 }}>
                            <Text style={{ color: 'transparent' }}>Shimmering Item</Text>
                        </View>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        style={{  marginBottom: 5,marginHorizontal: 20, borderRadius: 10}}
                        shimmerStyle={{  width: 160,
                            height: 20, borderRadius: 6 }}
                    >
                        <Text style={{ color: 'transparent' }}>Shimmering Item</Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        style={{  marginHorizontal: 20, borderRadius: 10}}
                        shimmerStyle={{  width: 160,
                            height: 20, borderRadius: 6 }}
                    >
                        <Text style={{ color: 'transparent' }}>Shimmering Item</Text>
                    </ShimmerPlaceholder>
                </View>
            )}
        />
    );
};

export default ShimmerList;
