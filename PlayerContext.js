import { createContext, useState } from "react";

// Create a context for the player
const Player = createContext();

/**
 * PlayerContext component that provides the current track and a function to update it.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components that will have access to the Player context.
 * @returns {JSX.Element} The provider component for the Player context.
 */
const PlayerContext = ({ children }) => {
    // State to hold the current track
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        // Provide the current track and a function to update it to the context consumers
        <Player.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </Player.Provider>
    );
};

export { PlayerContext, Player };
