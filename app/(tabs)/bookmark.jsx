import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserBookmarked } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import VideoCard2 from "../../components/VideoCard2";
import { useColorScheme } from "nativewind";
import SearchInput2 from "../../components/SearchInput2";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native";
const Bookmark = () => {
  const [loader, Setloader] = useState(false);
  const { user,  } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite((() => getUserBookmarked(user.$id)));
  const {colorScheme} = useColorScheme()

  function Startloader() {
    Setloader(true)
   }
   function Endloader() {
    Setloader(false)
   }

  useFocusEffect(
    useCallback(() => {
      const fetchData = () => {
        refetch()
      };
      fetchData();
    }, [])
  );
  return (
    <>
    {loader == true ? <ActivityIndicator size="large" color="black"  className="absolute top-[50%] opacity-[5] z-50 left-[50%]  "/> : ""}
    <SafeAreaView className={loader == true ? "dark:bg-primary opacity-[0.2] h-full" : "dark:bg-primary h-full "}>
      <StatusBar style={colorScheme ==='dark' ? 'light' : 'dark'}/>
  {console.log(posts)}
      <FlatList
      className="flex flex-col"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <>
          <VideoCard2
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users}
            avatar={item.avatar}
            id ={item.$id}
            refetch={refetch}
            end={Endloader}
            start= {Startloader}
          />
    </>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-col  my-6 px-4 space-y-6">
         
              <View className="p-[3rem]">
                <Text className="font-pmedium text-2xl   dark:text-gray-100 ">
                  Saved Vidoes
                </Text>    
            </View>
            <SearchInput2 />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Bookmarked Vidoes"
            subtitle="Bookmark your favourite vidoes"
          />
        )}
        />
    </SafeAreaView>
    </>
  );
};

export default Bookmark;
