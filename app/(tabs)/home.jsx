import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { getUserPosts } from "../../lib/appwrite";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useColorScheme } from "nativewind";
import { Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const {colorScheme, toggleColorScheme} = useColorScheme()
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [loader, Setloader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
 function Startloader() {
  Setloader(true)
 }
 function Endloader() {
  Setloader(false)
 }
  return (
    <>
       {loader == true ? <ActivityIndicator size="large" color="black"  className="absolute top-[50%] opacity-[5] z-50 left-[50%]  "/> : ""}
    <SafeAreaView className={loader == true ? "dark:bg-primary opacity-[0.2] h-full" : "dark:bg-primary h-full "}>
     
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
           start={Startloader}
           end={Endloader}
          />
         
        )}
        
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">

            <View className="flex justify-between items-start flex-row mb-6 sticky top-0">
              <View className="flex flex-row gap-4">
              <View>
                <Text className="font-pmedium text-xl dark:text-gray-100 " >
                  Welcome 
                </Text>
          
                <Text className="text-2xl font-psemibold dark:text-white">
                {user?.username}
                </Text>
                </View>
                <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular dark:text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
         <StatusBar style={colorScheme ==='dark' ? 'light' : 'dark'}/>
    </SafeAreaView>
    </>
  );
};

export default Home;
