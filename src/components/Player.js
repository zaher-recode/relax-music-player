import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Player({ song, shouldPlay, songs, setSongs, setCurrentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
    percentage: 0,
    // isReady: false,
  });

  // on selecting a song, play
  useEffect(() => {
    setSongInfo({
      duration: 0,
      currentTime: 0,
      percentage: 0,
      isReady: false,
    });
    if (isPlaying) {
      // const isReady =
      //   audioRef.current.currentTime > 0 &&
      //   !audioRef.current.paused &&
      //   !audioRef.current.ended &&
      //   audioRef.current.readyState > audioRef.current.HAVE_CURRENT_DATA;
      // console.log(isReady);

      // setSongInfo({ ...songInfo, isReady });
      // if (songInfo.isReady) {
      audioRef.current.play();
      // }
      setIsPlaying(true);
    }
  }, [song, isPlaying]);

  // on first load don't play
  useEffect(() => {
    setIsPlaying(false);
    audioRef.current.pause();
  }, []);

  // Event handlers
  const playSongHandler = (e) => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const timeUpdateHandler = (e) => {
    const percentage = Math.round((e.target.currentTime * 100) / e.target.duration);
    setSongInfo({
      percentage: percentage,
      duration: e.target.duration,
      currentTime: e.target.currentTime,
    });
  };
  const songLoadedHandler = (e) => {
    setSongInfo({
      percentage: 0,
      duration: e.target.duration,
      currentTime: 0,
    });
  };

  const slideHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    // setSongInfo(() => {
    //   return {
    //     ...songInfo,
    //     currentTime: e.target.value,
    //   };
    // });
  };

  const skipHandler = (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === song.id);
    let nextSong;

    if (direction === 'forwards') {
      //// without loop
      // if (currentIndex < songs.length - 1) {
      //   nextSong = songs[currentIndex + 1];
      // }
      /// with loop
      nextSong = songs[(currentIndex + 1) % songs.length];
    }
    if (direction === 'backwards') {
      //// without loop
      // if (currentIndex > 0) {
      //   nextSong = songs[currentIndex - 1];
      // }
      //// with loop
      if (currentIndex === 0) {
        nextSong = songs[songs.length - 1];
      } else {
        nextSong = songs[currentIndex - 1];
      }
    }
    if (nextSong) {
      const newSongs = songs.map((s) => (s.id === nextSong.id ? { ...s, active: true } : { ...s, active: false }));
      setCurrentSong(nextSong);
      setIsPlaying(true);
      setSongs(newSongs);
      // if (songInfo.isReady) {
      audioRef.current.play();
      // }
    }
  };

  const songEndedHandler = () => {
    const currentIndex = songs.findIndex((s) => s.id === song.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
    audioRef.current.play();
  };

  const getTime = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={{ background: `linear-gradient(to right, ${song.colors[0]}, ${song.colors[1]})` }}>
          <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={slideHandler} />
          <div className="animate-track" style={{ transform: `translateX(${songInfo.percentage}%)` }} />
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="play" size="2x" icon={faAngleLeft} onClick={() => skipHandler('backwards')} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="play" size="2x" icon={faAngleRight} onClick={() => skipHandler('forwards')} />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={songLoadedHandler}
        onEnded={songEndedHandler}
        ref={audioRef}
        src={song.audio}
      />
    </div>
  );
}
