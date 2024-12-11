import React, {
  useState,
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AntDesign, Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { BottomModal, ModalContent } from "react-native-modals";
import { Player } from "./PlayerContext";
import { Audio } from "expo-av";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ToastAndroid, Platform, Alert } from "react-native";

function notifyMessage() {
  if (Platform.OS === "android") {
    ToastAndroid.show("toast android", ToastAndroid.SHORT);
  } else {
    Alert.alert("toasttt ios");
  }
}

const FloatingPlayer = forwardRef(({ image }, ref) => {
  useImperativeHandle(ref, () => ({
    playTrack,
    play,
    handlePauseWhenBack,
    isSongPlaying,
    setAllMyTracks,
    handlePlayPause,
  }));

  // Variaveis de estado
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [myTracks, setMyTracks] = useState([]);
  const circleSize = 12;
  const value = useRef(0);
  const { currentTrack, setCurrentTrack } = useContext(Player);

  // Coloca todas as faixas na lista de reprodução
  const setAllMyTracks = async (tracks) => {
    value.current = 0;
    if (tracks.length > 0) {
      setMyTracks(tracks);
    }
  };

  // Toca a faixa por ordem
const playTrack = async (trackToPlay, index) => {
  const preview_url = trackToPlay?.track?.preview_url || trackToPlay?.preview_url;
  if (!preview_url) {
    const msg = "Visualização indisponível no market atual";
    console.log(msg);
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
    return;
  }

  try {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });

    const { sound, status } = await Audio.Sound.createAsync(
      { uri: preview_url },
      { shouldPlay: true, isLooping: false },
      onPlaybackStatusUpdate
    );

    onPlaybackStatusUpdate(status);
    setCurrentSound(sound);
    setIsPlaying(status.isLoaded);
    value.current = index;
    await sound.playAsync();
  } catch (err) {
    console.error("Error playing sound:", err.message);
  }
};

// Toca a playlist usando o expo-av
const play = async (trackToPlay, index) => {
  const preview_url = trackToPlay?.track?.preview_url || trackToPlay?.preview_url;
  if (!preview_url) {
    const msg = "Visualização indisponível no market atual";
    console.log(msg);
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
    return;
  }

  try {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });

    const { sound, status } = await Audio.Sound.createAsync(
      { uri: preview_url },
      { shouldPlay: true, isLooping: false },
      onPlaybackStatusUpdate
    );

    onPlaybackStatusUpdate(status);
    setCurrentSound(sound);
    setIsPlaying(status.isLoaded);
    value.current = index;
    await sound.playAsync();
  } catch (err) {
    console.error("Error playing sound:", err.message);
  }
};
  // Playback status update
  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinish) {
      setCurrentSound(null);
      playNextTrack();
    }
  };

  // Consta a duração da faixa em minutos e segundos
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Começa a tocar a próxima faixa
  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < myTracks.length) {
    } else {
      value.current = 0;
    }
    const nextTrack = myTracks[value.current];
    setCurrentTrack(nextTrack);
    await play(nextTrack, value.current);
  };

  // Começa a tocar a faixa anterior
  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (value.current >= 0) {
    } else {
      value.current = 0;
    }
    const nextTrack = myTracks[value.current];
    setCurrentTrack(nextTrack);
    await play(nextTrack, value.current);
  };

  // Ação do botão de play/pause
  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ação do botão de pause quando o app está em background
  const handlePauseWhenBack = async () => {
    if (currentSound && isPlaying) {
      await currentSound.pauseAsync();
    }
    setCurrentSound(null);
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  // Verifica se a faixa está tocando
  const isSongPlaying = () => isPlaying;

  // Determina a URL da imagem da faixa
  const url_image = currentTrack?.track?.album?.images[0]?.url || image;
  return (
    <>
      {currentTrack && (
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: "#7f7d7d",
            width: "90%",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15,
            position: "absolute",
            borderRadius: 15,
            left: 20,
            bottom: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            shadowColor: "white",
            shadowRadius: 50,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 5 }}
              source={{ uri: url_image }}
            />

            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                width: 220,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {currentTrack?.track?.name
                ? currentTrack?.track?.name
                : currentTrack?.name}{" "}
              • {/* {currentTrack?.track?.name} •{" "} */}
              {currentTrack?.track?.artists[0].name
                ? currentTrack?.track?.artists[0].name
                : currentTrack?.artists[0].name}
              {/* {currentTrack?.track?.artists[0].name} */}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AntDesign name="heart" size={24} color="#ffa800" />

            <Pressable onPress={handlePlayPause}>
              {isPlaying ? (
                <AntDesign
                  name="pausecircle"
                  size={24}
                  color="#ffa800"
                  style={{
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 10 },
                    shadowRadius: 50,
                    elevation: 5,
                  }}
                />
              ) : (
                <Pressable
                  onPress={handlePlayPause}
                  style={{
                    backgroundColor: "#ffa800",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 10 },
                    shadowRadius: 50,
                    elevation: 5,
                  }}
                >
                  <Entypo name="controller-play" size={24} color="black" />
                </Pressable>
              )}
            </Pressable>
            {/*  <Pressable >
                <AntDesign name="pausecircle" size={24} color="white" />
            </Pressable> */}
          </View>
        </Pressable>
      )}
      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent
          style={{ height: "100%", width: "100%", backgroundColor: "#070707" }}
        >
          <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                onPress={() => setModalVisible(!modalVisible)}
                name="down"
                size={24}
                color="white"
              />

              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {/* {currentTrack?.track?.name} */}
                {currentTrack?.track?.name
                  ? currentTrack?.track?.name
                  : currentTrack?.name}
              </Text>

              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>

            <View style={{ height: 70 }} />

            <View style={{ padding: 10 }}>
              <Image
                style={{ width: "100%", height: 330, borderRadius: 4 }}
                source={{ uri: url_image }}
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {/* {currentTrack?.track?.name} */}
                    {currentTrack?.track?.name
                      ? currentTrack?.track?.name
                      : currentTrack?.name}
                  </Text>
                  <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                    {/* {currentTrack?.track?.artists[0].name} */}
                    {currentTrack?.track?.artists[0].name
                      ? currentTrack?.track?.artists[0].name
                      : currentTrack?.artists[0].name}
                  </Text>
                </View>

                <AntDesign name="heart" size={24} color="#ffa800" />
              </View>

              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    height: 3,
                    backgroundColor: "gray",
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={[
                      styles.progressbar,
                      { width: `${progress * 100}%` },
                    ]}
                  />
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -5,
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        backgroundColor: "white",
                      },
                      {
                        left: `${progress * 100}%`,
                        marginLeft: -circleSize / 2,
                      },
                    ]}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 15, color: "#ffa800" }}
                  >
                    {formatTime(currentTime)}
                  </Text>

                  <Text
                    style={{ color: "white", fontSize: 15, color: "#ffa800" }}
                  >
                    {formatTime(totalDuration)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 17,
                }}
              >
                <Pressable>
                  {/* <FontAwesome name="arrows" size={30} color="#03C03C" />*/}
                </Pressable>
                <Pressable onPress={playPreviousTrack}>
                  <Ionicons name="play-skip-back" size={30} color="#ffa800" />
                </Pressable>
                <Pressable onPress={handlePlayPause}>
                  {isPlaying ? (
                    <AntDesign
                      name="pausecircle"
                      size={60}
                      color="#ffa800"
                      style={{}}
                    />
                  ) : (
                    <Pressable
                      onPress={handlePlayPause}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#ffa800",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo
                        name="controller-play"
                        size={26}
                        color="black"
                        style={{
                        }}
                      />
                    </Pressable>
                  )}
                </Pressable>
                <Pressable onPress={playNextTrack}>
                  <Ionicons
                    name="play-skip-forward"
                    size={30}
                    color="#ffa800"
                  />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#ffa800" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
});

export default FloatingPlayer;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});