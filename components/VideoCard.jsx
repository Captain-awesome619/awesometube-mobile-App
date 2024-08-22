import { useState } from "react";

import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useColorScheme } from "nativewind";
import { icons } from "../constants";
import { Alert } from "react-native";
import { Bookmark } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import useAppwrite from "../lib/useAppwrite";
const VideoCard = ({ title, creator, avatar, thumbnail, video, }) => {
  const [play, setPlay] = useState(false);
  const {colorScheme} = useColorScheme()
  const { user } = useGlobalContext();
  const [liked,setLiked] = useState({
    title1 : "",
    thumbnail1 :"",
    video1 :"",
    creator1 : '',
    avatar1 : ''
  })
  
  const book = async () => {
    
    try {
      setLiked({title1:title,thumbnail1:thumbnail,video1:video,creator1:creator,avatar1:avatar })
      await 
      Bookmark(liked);
     
    } catch (error) {
      Alert.alert("Error", error.message);
    } 
  };
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg bg-white dark:bg-black "
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

        <View className="pt-2" onTouchStart={book}  >
          <Image source={icons.plus} className="w-5 h-5" resizeMode="contain" />
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

export default VideoCard;
