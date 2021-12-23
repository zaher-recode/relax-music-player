import Player from './components/Player';
import Song from './components/Song';
import data from './utils';
import './styles/app.scss';
import { useState } from 'react';
import SongsList from './components/SongsList';
import Nav from './components/Nav';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  return (
    <div className={`app ${isLibraryOpen ? 'library-active' : ''}`}>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song song={currentSong} />
      <Player song={currentSong} shouldPlay={shouldPlay} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} />

      <SongsList songs={songs} setSong={setCurrentSong} setShouldPlay={setShouldPlay} setSongs={setSongs} isLibraryOpen={isLibraryOpen} />
    </div>
  );
}

export default App;
