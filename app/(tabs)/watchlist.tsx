import { styles as tabStyles } from "@/app/(tabs)/_layout";
import FiltersMenu, { Filter } from "@/components/FiltersMenu";
import MovieShelf from "@/components/MovieShelf";
import { RootState } from "@/shared/redux/store";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function WatchListScreen() {
  const watchList = useSelector((state: RootState) => state.watchList);

  const [filter, setFilter] = useState<Filter>("all");

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <FlashList
        data={watchList[filter].results}
        onEndReachedThreshold={0.3}
        estimatedItemSize={716}
        ListHeaderComponent={() => (
          <FiltersMenu
            defaultFilter={filter}
            currentFilter={(filter) => {
              setFilter(filter);
            }}
          />
        )}
        ListFooterComponent={() => (
          <View style={styles.marginBottomView}></View>
        )}
        renderItem={({ item }) => {
          return <MovieShelf data={item} height={220} />;
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  marginBottomView: {
    height: tabStyles.tabBarStyle.height + 38,
    backgroundColor: "transparent",
  },
  filterContainer: {
    backgroundColor: "#14171D",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 46,
    padding: 8,
  },
});
