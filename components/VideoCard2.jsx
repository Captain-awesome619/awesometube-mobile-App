import { useState,useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { deleteBookmarked } from "../lib/appwrite";
import { icons } from "../constants";
import { useColorScheme } from "nativewind";
const VideoCard2 = ({ title, creator, avatar, thumbnail, video,id,refetch ,start,end}) => {
 
  const [posts,setPosts] = useState([])
  const [play, setPlay] = useState(false);
const [ID,SETID ] = useState(null)
const {colorScheme} = useColorScheme()
 useEffect(() => {
    if (ID !== null) {
       handleRemoveVideo(ID)
    }
  }, [ID]); 
  function trig() {
    SETID(id)
  }
  const removeVideoFromState = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };
  const handleRemoveVideo = async (ID) => {
    start()
    await deleteBookmarked(ID); 
    refetch()// Call to Appwrite SDK to remove the document
    removeVideoFromState(ID)
    end()
  };
  return (
    <View className="flex flex-col items-center px-4 mb-14">
        
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg    bg-white dark:bg-black"
              resizeMode="cover"
              tintColor={colorScheme === "light" ? "black" : "white"}
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
             className="font-psemibold text-sm  text-black  dark:text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs dark:text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2" onTouchStart={trig}>
          <Image source={icons.bin} className="w-5 h-5" resizeMode="contain" tintColor={"orange"} />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard2;