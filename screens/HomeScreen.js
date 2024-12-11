import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ArtistCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";
import {
  getPlaylists,
  getProfile,
  getRecentlyPlayedSongs,
  getTopArtists,
} from "../spotifyApi";

const HomeScreen = () => {
  const [playlists, setPlaylists] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const navigation = useNavigation();

  // Coleta os dados de Usuário do Spotify
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, playlistsData, recentlyPlayedData, topArtistsData] =
          await Promise.all([
            getProfile(),
            getPlaylists(),
            getRecentlyPlayedSongs(),
            getTopArtists(),
          ]);
        /* console.log(profileData) */
        setUserProfile(profileData);
        setPlaylists(playlistsData);
        setRecentlyPlayed(recentlyPlayedData);

        setTopArtists(topArtistsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Gera uma mensagem de saudação com base no horário do dia
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Bom dia,";
    } else if (currentTime < 16) {
      return "Boa tarde,";
    } else {
      return "Boa noite,";
    }
  };

  const message = greetingMessage();

  // Gerar um item de playlist
  const renderItem = ({ item }) => {
    if (!item) return null; // Garantir que o item não seja null ou undefined

    const imageUrl = item?.images?.[0]?.url; // Verificação segura para a URL da imagem
    const itemName = item?.name || "Nome não disponível"; // Se o nome for null ou undefined, exibe um texto alternativo

    return (
      <Pressable
        onPress={() =>
          navigation.navigate("PlaylistInfo", {
            item: item,
          })
        }
        style={styles.playlistItem}
      >
        <Image
          style={styles.playlistImage}
          source={{
            uri: imageUrl
              ? imageUrl
              : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb777e7a-7d3c-487e-865a-fc83920564a1/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg/v1/fill/w_800,h_800,q_75,strp/no_album_art__no_cover___placeholder_picture_by_cmdrobot_d7kpm65-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwi... ",
          }}
        />
        <View style={styles.playlistInfo}>
          <Text numberOfLines={2} style={styles.playlistName}>
            {itemName}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#070707", "#070707"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        {/* Perfil do Usuário e Saudação */}
        <View style={styles.profileContainer}>
          <View style={styles.greetingContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: userProfile?.images[0]?.url }}
            />
            <Text style={styles.greetingText}>
              {message} {userProfile?.display_name}!
            </Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="white"
          />
        </View>

        {/* Botões de Música e Podcast */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.musicButton}>
            <Text style={styles.musicButtonText}>Musica</Text>
          </Pressable>
          <Pressable style={styles.podcastButton}>
            <Text style={styles.podcastButtonText}>Podcasts & Shows</Text>
          </Pressable>
        </View>

        {/* Acesso Rápido às Músicas Curtidas */}
        <View style={styles.quickAccessContainer}>
          <Pressable
            onPress={() => navigation.navigate("Liked")}
            style={styles.likedSongsContainer}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable style={styles.likedSongsIcon}>
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>
            <Text style={styles.likedSongsText}>Músicas Curtidas</Text>
          </Pressable>

          <View style={styles.randomArtistContainer}>
            <Image
              style={styles.randomArtistImage}
              source={{
                uri: "https://i1.sndcdn.com/artworks-7zm7buhclxlW-0-t1080x1080.jpg",
              }}
            />
            <Text style={styles.randomArtistText}>Playlist Aleatoria</Text>
          </View>
        </View>

        {/* Playlists */}
        <FlatList
          data={playlists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.playlistWrapper}
          contentContainerStyle={styles.playlistContent}
          scrollEnabled={false}
        />

        {/* Melhores Artistas */}
        <Text style={styles.sectionTitle}>Seus Artistas Favoritos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <ArtistCard item={item} key={index} />
          ))}
        </ScrollView>

        {/* Ouvidas Recentes */}
        <Text style={styles.sectionTitle}>Ouvidas Recentemente</Text>
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCard item={item} key={index} />
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  greetingText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginHorizontal: 12,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  musicButton: {
    backgroundColor: "#ffa800",
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 45,
  },
  musicButtonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
  },
  podcastButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 50,
  },
  podcastButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
  quickAccessContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: -8,
    marginBottom: 5,
  },
  likedSongsContainer: {
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: "#202020",
    borderRadius: 4,
    elevation: 3,
  },
  likedSongsIcon: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  likedSongsText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  randomArtistContainer: {
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginHorizontal: 9,
    marginVertical: 8,
    backgroundColor: "#202020",
    borderRadius: 4,
    elevation: 3,
  },
  randomArtistImage: {
    width: 55,
    height: 55,
  },
  randomArtistText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  playlistItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: "#282828",
    borderRadius: 4,
    elevation: 3,
  },
  playlistImage: {
    height: 55,
    width: 55,
  },
  playlistInfo: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: "center",
  },
  playlistName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  playlistWrapper: {
    justifyContent: "space-between",
    gap: -9,
  },
  playlistContent: {
    gap: -5,
  },
  sectionTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
