import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAllPlaylists, getProfile } from "../spotifyApi";

const LibraryScreen = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const navigation = useNavigation();

    // Coleta todas as playlists do usuário
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const playlistsData = await getAllPlaylists();
                setPlaylists(playlistsData);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    // Coleta o perfil do usuário
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setUserProfile(profileData);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <LinearGradient colors={["#070707", "#070707"]} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>
                {/* User Profile Section */}
                <View style={{ padding: 12 }}>
                    <View style={styles.userInfo}>
                        <Image
                            style={styles.userImage}
                            source={{ uri: userProfile?.images[0]?.url }}
                        />
                        <View>
                            <Text style={styles.userName}>
                                {userProfile?.display_name || "Username"}
                            </Text>
                            <Text style={styles.userEmail}>
                               {/*  {userProfile?.email || "email@email.com"} */}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Playlists  */}
                <Text style={styles.playlistsTitle}>Suas Playlists</Text>
                <View style={styles.playlistContainer}>
                    {playlists.map((item, index) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("PlaylistInfo", {
                                    item: item,
                                })
                            }
                            key={index}
                        >
                            <View style={styles.playlistItem}>
                                <Image
                                    source={{
                                        uri: item?.images[0]?.url ||
                                            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb777e7a-7d3c-487e-865a-fc83920564a1/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg/v1/fill/w_800,h_800,q_75,strp/no_album_art__no_cover___placeholder_picture_by_cmdrobot_d7kpm65-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZWI3NzdlN2EtN2QzYy00ODdlLTg2NWEtZmM4MzkyMDU2NGExXC9kN2twbTY1LTQzN2IyYjQ2LTA2Y2QtNGE4Ni05MDQxLWNjOGMzNzM3YzZmMC5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.8yjX5CrFjxVH06LB59TpJLu6doZb0wz8fGQq4tM64mg",
                                    }}
                                    style={styles.playlistImage}
                                />
                                <View>
                                    <Text style={styles.playlistName}>{item?.name}</Text>
                                    <Text style={styles.playlistDescription}>
                                        Playlist • Feita por {userProfile?.display_name}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default LibraryScreen;

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: "cover",
    },
    userName: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    userEmail: {
        color: "gray",
        fontSize: 16,
        fontWeight: "bold",
    },
    playlistsTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: 12,
    },
    playlistContainer: {
        padding: 15,
    },
    playlistItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 10,
    },
    playlistImage: {
        width: 67,
        height: 67,
        borderRadius: 4,
    },
    playlistName: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
    playlistDescription: {
        fontSize: 12,
        color: "#B3B3B3",
        marginTop: 7,
        fontWeight: "bold",
    },
});
