import React, { useEffect } from "react";
import { Image, Text, View, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useSpotifyAuth,
  checkTokenValidity,
  fetchSpotifyToken,
} from "../spotifyApi";
import { FontAwesome5 } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = useSpotifyAuth();

  // Efeito para verificar se o usuário já está autenticado
  useEffect(() => {
    if (response?.type === "success") {
      const handleSpotifyAuth = async () => {
        const code = response.params.code;
        const result = await fetchSpotifyToken(code);
        if (result) {
          navigation.navigate("Main");
        }
      };
      handleSpotifyAuth();
    }
  }, [response, navigation]);

  // Função para autenticar o usuário
  const authenticate = async () => {
    ///verifica se o token é valido
    const validToken = await checkTokenValidity();
    if (validToken) {
      /* console.log("token ok") */
      ///quando confirma conecxão - leva a home
      navigation.replace("Main");
    } else {
      ///conecta ao spotify
      promptAsync();
    }
  };

  return (
    <LinearGradient colors={["#bebcbc", "#070707"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 50 }} />
        <Image
          source={require("../assets/gif v.gif")}
          style={{
            width: 150,
            height: 150,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          Millions of Songs.{"\n"}Gratis no VibeFlow{"\n"} "Spotify API".
        </Text>

        <View style={{ height: 50 }} />
        <Pressable
          style={{
            backgroundColor: "#ffa800",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 337,
            height: 49,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Criar conta Gratis
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#121212",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 337,
            height: 49,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 7,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <AntDesign name="google" size={24} color="#ffa800" />
          <Text
            style={{
              color: "#F5F5F5",
              fontWeight: "bold",
              fontSize: 17,
              textAlign: "center",
              flex: 1,
            }}
          >
            Entrar com Google
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#121212",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 337,
            height: 49,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 7,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <FontAwesome5 name="facebook" size={24} color="#ffa800" />
          <Text
            style={{
              color: "#F5F5F5",
              fontWeight: "bold",
              fontSize: 17,
              textAlign: "center",
              flex: 1,
            }}
          >
            Entrar com Facebook
          </Text>
        </Pressable>
        <Pressable
          onPress={authenticate}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: 337,
            height: 49,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 0,
          }}
        >
          <Text
            style={{
              color: "#F5F5F5",
              fontWeight: "bold",
              fontSize: 17,
              textAlign: "center",
              color: "#ffa800",
              flex: 1,
            }}
          >
            Entrar com Spotify
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
