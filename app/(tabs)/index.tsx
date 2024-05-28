import { styles as tabStyles } from "@/app/(tabs)/_layout";
import FiltersMenu, { Filter } from "@/components/FiltersMenu";
import MovieShelf from "@/components/MovieShelf";
import ThemedView from "@/components/ThemedView";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { RootState } from "@/shared/redux/store";
import { addMedia } from "@/shared/redux/trending";
import { sleep } from "@/shared/redux/utils";
import { getStorage } from "@/shared/redux/watchlist";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const trending = useSelector((state: RootState) => state.trending);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<Filter>("all");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [fetchedInitialPages, setFetchedInitialPages] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getStorage() as any);
    // Fetch first 4 trengding pages on initialization
    fetchPages(4);
  }, []);

  const fetchPages = async (pages: number) => {
    const initialPage = trending[filter].page + 1;
    let trendingResponse = await movieAPI.getTrendingShows(initialPage, filter);
    dispatch(addMedia({ trending: trendingResponse, filter }));

    const maxPages = Math.min(
      trendingResponse.total_pages,
      trending[filter].page + pages
    );

    for (var i = initialPage + 1; i <= maxPages; i++) {
      await sleep(1000);
      trendingResponse = await movieAPI.getTrendingShows(i, filter);
      dispatch(addMedia({ trending: trendingResponse, filter }));
    }

    if (!fetchedInitialPages) {
      setFetchedInitialPages(true);
    }
  };

  const [first, setfirst] = useState(true);

  return (
    <ThemedView>
      <FlashList
        onScroll={() => setfirst(false)}
        data={[[], ...trending[filter].results]}
        onEndReachedThreshold={0.3}
        estimatedItemSize={716}
        ListFooterComponent={() => (
          <View style={styles.marginBottomView}></View>
        )}
        onEndReached={() => {
          if (fetchedInitialPages && !isSearching) fetchPages(3);
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
                    fetchPages(3);
                  }
                }}
              />
            );
          return <MovieShelf data={item} height={220} />;
        }}
      />
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
});
