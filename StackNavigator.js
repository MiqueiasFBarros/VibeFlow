import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import LoginScreen from "./screens/LoginScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SongInfoScreen from "./screens/SongInfoScreen";
import PlaylistInfoScreen from "./screens/PlaylistInfoScreen";

// Inicializa o bottom tab navigator
const Tab = createBottomTabNavigator();

// Inicializa o Stack Navigator
const Stack = createNativeStackNavigator();

// Tab bar options para o estilo consistente
const tabBarOptions = {
    tabBarStyle: {
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowOpacity: 4,
        shadowRadius: 4,
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        borderTopWidth: 0
    }
};

// Função para renderizar ícones
const renderIcon = (focused, nameFocused, nameDefault, FocusedIconComponent, DefaultIconComponent) => {
    return focused ? <FocusedIconComponent name={nameFocused} size={24} color="white" /> : <DefaultIconComponent name={nameDefault} size={24} color="white" />;
};

// Componente Bottom Tabs
function BottomTabs() {
    return (
        <>
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    shadowOpacity: 4,
                    shadowRadius: 4,
                    elevation: 4,
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    borderTopWidth: 0
                }
            }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) => renderIcon(focused,"home","home", Entypo, AntDesign)

                    }}
                />
                <Tab.Screen
                    name="Library"
                    component={LibraryScreen}
                    options={{
                        tabBarLabel: "Library",
                        headerShown: false,
                        tabBarLabelStyle: { color: "white" },
                        tabBarIcon: ({ focused }) => renderIcon(focused,"library","library-outline", Ionicons, Ionicons)
                    }}
                />
            </Tab.Navigator>
        </>

    );
}


// Componente Main Navigation
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Liked" component={LikedSongsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Info" component={SongInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PlaylistInfo" component={PlaylistInfoScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
