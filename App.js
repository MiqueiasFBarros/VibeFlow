import { ModalPortal } from "react-native-modals"; // Import ModalPortal for rendering modals
import { PlayerContext } from "./PlayerContext"; // Import PlayerContext for managing player state
import Navigation from "./StackNavigator"; // Import the navigation stack

// Main App component
export default function App() {
  return (
    <>
      {/* Wrap the app in PlayerContext to provide player state */}
      <PlayerContext>
        {/* Render the navigation stack */}
        <Navigation />
        {/* Render the modal portal for handling modals */}
        <ModalPortal />
      </PlayerContext>
    </>
  );
}