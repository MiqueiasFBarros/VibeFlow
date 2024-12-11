import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";

const SongItem = ({ item, onPress, isLiked, floatingPlayerRef, index }) => {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    // Função para lidar com o evento de pressionar no item da música
    const handlePress = () => {
        const isTrackPlaying = floatingPlayerRef.current.isSongPlaying();

        if (!isTrackPlaying) {
            setCurrentTrack(item);
            onPress(item,index);
        } else {
            floatingPlayerRef.current.handlePlayPause();
            setCurrentTrack(item);
            onPress(item,index);
        }
    };

    // Obter a URL da imagem do álbum, se disponível
    const url_image = item?.track?.album?.images[0]?.url || "";

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {url_image ? (
                <Image style={styles.image} source={{ uri: url_image }} />
            ) : (
                <Text></Text>
            )}
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.songName}>
                    {item?.track?.name || item?.name}
                </Text>
                <Text style={styles.artistName}>
                    {item?.track?.artists[0]?.name || item?.artists[0]?.name}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                {isLiked && <AntDesign name="heart" size={24} color="#ffa800" />}
                <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
            </View>
        </Pressable>
    );
};

export default SongItem;

// Estilos para o componente SongItem
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    songName: {
        fontWeight: "bold",
        fontSize: 14,
        color: "white",
    },
    artistName: {
        marginTop: 4,
        color: "#989898",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        marginHorizontal: 10,
    },
});
