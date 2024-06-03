import { styles as tabStyles } from "@/app/(tabs)/_layout";
import FiltersMenu, { Filter } from "@/components/FiltersMenu";
import MovieShelf from "@/components/MovieShelf";
import ThemedView from "@/components/ThemedView";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { getWatchlistStorage } from "@/shared/redux/watchlist";
import { FlashList } from "@shopify/flash-list";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const trending = useSelector((state: RootState) => state.trending);
  const dispatch: AppDispatch = useDispatch();

  const [filter, setFilter] = useState<Filter>("all");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getWatchlistStorage() as any);
  }, []);

  const fetchPages = async () => {
    const initialPage = trending[filter].page + 1;
    await dispatch(movieAPI.getTrendingShows({ page: initialPage, filter }));
  };

  return (
    <ThemedView>
      {!/Android|iOS|iPadOS/.test(Device.osName || "") ? (
        <Text style={styles.phoneText}>
          Please visit the site with a mobile device
        </Text>
      ) : (
        <FlashList
          data={[[], ...trending[filter].results]}
          onEndReachedThreshold={0.3}
          estimatedItemSize={716}
          ListFooterComponent={() => (
            <View style={styles.marginBottomView}></View>
          )}
          onEndReached={() => {
            if (!isSearching) fetchPages();
          }}
          renderItem={({ item, index }) => {
            if (index === 0)
              return (
                <FiltersMenu
                  defaultFilter={filter}
                  currentFilter={(filter) => {
                    setFilter(filter);
                  }}
                  isCurrentlySearching={(isSearching) => {
                    setIsSearching(isSearching);
                    if (!isSearching) {
                      fetchPages();
                    }
                  }}
                />
              );
            return <MovieShelf data={item} height={220} />;
          }}
        />
      )}
    </ThemedView>
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
    height: Dimensions.get("screen").height,
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
  phoneText: {
    marginVertical: "auto",
    marginHorizontal: "auto",
    color: "white",
    fontSize: 24,
  },
});
