import React, { useEffect } from 'react';
import SongItem from './SongItem';

export default function SongsList({ songs, setSong, setShouldPlay, setSongs, isLibraryOpen }) {
  return (
    <div className={`library ${isLibraryOpen ? 'library--active' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <SongItem key={song.id} song={song} setSong={setSong} setShouldPlay={setShouldPlay} setSongs={setSongs} songs={songs}></SongItem>
        ))}
      </div>
    </div>
  );
}
