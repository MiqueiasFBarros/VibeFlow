import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, View, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import SongItem from "../components/SongItem";
import { fetchAlbumSongs } from "../spotifyApi";
import FloatingPlayer from "../FloatingPlayer";

const SongInfoScreen = () => {
  const floatingPlayerRef = useRef(null);
  const [recentlyPlayedtracks, setRecentlyPlayedtracks] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const albumId = route?.params?.item?.track?.album?.uri.split(":")[2];

  // Buscar músicas do álbum quando o componente for montado
  useEffect(() => {
    async function loadAlbumSongs() {
      try {
        const tracks = await fetchAlbumSongs(albumId);
        setRecentlyPlayedtracks(tracks);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadAlbumSongs();
  }, [albumId]);

  // Pressinamento do botão de play
  const handlePress = async () => {
    if (floatingPlayerRef.current) {
      await floatingPlayerRef.current.setAllMyTracks(recentlyPlayedtracks);
      await floatingPlayerRef.current.playTrack(recentlyPlayedtracks);
    }
  };

  // Pressionamento do botão de voltar
  const handlePress2 = () => {
    if (floatingPlayerRef.current) {
      floatingPlayerRef.current.handlePauseWhenBack();
    }
    navigation.goBack();
  };

  return (
    <LinearGradient colors={["#070707", "#070707"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        {/* Capa do Album e Botão Voltar */}
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons onPress={handlePress2} name="arrow-back" size={24} color="white" />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: route?.params?.item?.track?.album?.images[0].url }}
            />
          </View>
        </View>
        {/* Album e titulo dos Artistas */}
        <Text style={{ color: "white", marginHorizontal: 12, marginTop: 10, fontSize: 22, fontWeight: "bold" }}>
          {route?.params?.item?.track?.name}
        </Text>
        <View style={{ marginHorizontal: 12, flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 10, gap: 7 }}>
          {route?.params?.item?.track?.artists?.map((item, index) => (
            <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }} key={index}>
              {item.name}
            </Text>
          ))}
        </View>
        {/* Botão Play */}
        <Pressable style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }}>
          <Pressable onPress={handlePress} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "#ffa800", justifyContent: "center", alignItems: "center" }}>
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable onPress={handlePress} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa800" }}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
        {/* Lista de Músicas */}
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recentlyPlayedtracks}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <SongItem item={item} onPress={floatingPlayerRef.current.play} isLiked={false} floatingPlayerRef={floatingPlayerRef} />
            )}
          />
        </View>
      </ScrollView>
      {/* Player Flutuante */}
      <FloatingPlayer image={route?.params?.item?.track?.album?.images[0].url} ref={floatingPlayerRef} />
    </LinearGradient>
  );
};

export default SongInfoScreen;
