import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { Player } from './PlayerContext';

const PlayerControls = () => {
    const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = useContext(Player);

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else if (currentTrack) {
            resumeTrack();
        } else {
            playTrack({ uri: 'path/to/your/music/file.mp3' }); // Substitua pelo URI da sua faixa
        }
    };

    return (
        <View>
            <Text>{currentTrack ? currentTrack.uri : 'No track playing'}</Text>
            <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
        </View>
    );
};

export default PlayerControls;