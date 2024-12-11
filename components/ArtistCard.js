import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

// ArtistCard Component
const ArtistCard = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* Imagem do Arista */}
      <Image
        style={styles.image}
        source={{ uri: item.images[0].url }}
      />
      {/* Nome do Artista */}
      <Text style={styles.text}>
        {item?.name}
      </Text>
    </View>
  );
};

export default ArtistCard;

// Estilos para o componente ArtistCard
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    marginTop: 10,
  },
});
