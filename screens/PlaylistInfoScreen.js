import { Image, Pressable, ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import SongItem from "../components/SongItem";
import { fetchPlaylistSongs } from "../spotifyApi"; // Importa a função fetchPlaylistSongs
import FloatingPlayer from "../FloatingPlayer";

const PlaylistInfoScreen = () => {
  const floatingPlayerRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [error, setError] = useState(null);

  const playlistUrl = route?.params?.item?.external_urls?.spotify;
  const playlistId = playlistUrl ? playlistUrl.split("/")[4] : null;

  useEffect(() => {
    async function loadSongs() {
      if (playlistId) {
        try {
          const tracks = await fetchPlaylistSongs(playlistId);
          setPlaylistTracks(tracks);
        } catch (err) {
          console.log(err.message);
          setError("Erro ao carregar as músicas da playlist.");
        }
      } else {
        setError("Playlist não encontrada.");
      }
    }
    loadSongs();
  }, [playlistId]);

  // Botão de play
  const handlePress = async () => {
    if (floatingPlayerRef.current) {
      await floatingPlayerRef.current.setAllMyTracks(playlistTracks);
      await floatingPlayerRef.current.playTrack(playlistTracks);
    }
  };

  // Botão de Voltar
  const handlePress2 = () => {
    if (floatingPlayerRef.current) {
      floatingPlayerRef.current.handlePauseWhenBack();
    }
    navigation.goBack();
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={handlePress2} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#070707", "#070707"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={handlePress2}
            name="arrow-back"
            size={24}
            color="white"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: route?.params?.item?.images[0].url }}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {route?.params?.item?.name}
        </Text>
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
          }}
        >
          {route?.params?.item?.track?.artists?.map((item, index) => (
            <Text
              key={index}
              style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}
            >
              {item.name}
            </Text>
          ))}
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#ffa800",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Pressable
              onPress={handlePress}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffa800",
              }}
            >
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={playlistTracks}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <SongItem
                item={item}
                onPress={floatingPlayerRef.current.play}
                isLiked={false}
                floatingPlayerRef={floatingPlayerRef}
              />
            )}
          />
        </View>
      </ScrollView>
      <FloatingPlayer ref={floatingPlayerRef} />
    </LinearGradient>
  );
};

export default PlaylistInfoScreen;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070707',
  },
  errorText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ffa800',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});