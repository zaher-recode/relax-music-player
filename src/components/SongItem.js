import React, { useEffect } from 'react';

export default function SongItem({ song, setSong, setShouldPlay, setSongs, songs }) {
  const selectSongHandler = (song) => {
    setShouldPlay(true);
    setSong(song);
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    // console.log(newSongs);
    setSongs(newSongs);
  };
  return (
    <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={() => selectSongHandler(song)}>
      <img src={song.cover} alt="song cover" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
