import { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Player from './components/Player/Player';
import musics from './musics';

function App() {

  const audio = useRef(null);

  const [activeMusic, setActiveMusic] = useState({});
  const [soundPlay, setSoundPlay] = useState(false);
  const [pause, setPause] = useState(false);
  
  useEffect(() => {
    if (activeMusic.id) {
      if (soundPlay) {
        audio.current.play();
      }
      else {
        audio.current.pause();
      } 
    }
  }, [soundPlay])

  useEffect(() => {
    if (activeMusic.id) {
      if (!soundPlay) {
        setSoundPlay(!soundPlay);
        audio.current.play();
      }
    }
    
  }, [activeMusic, setSoundPlay])
  
  function handleMusic() {  
    setSoundPlay(!soundPlay);
  }

  function handleStopMusic() {
    setActiveMusic({});

    if (soundPlay) {
      audio.current.pause();
      setSoundPlay(false);
    }
  }

  function handlePreviousMusic() {
    const currentMusic = activeMusic.id;

    const filter = musics.find((music) => {
      return music.id === currentMusic - 1;
    })

    if (!filter) {
      const lastMusic = musics.at(-1);
      return setActiveMusic(lastMusic);
    }

    setActiveMusic(filter)
  }

  function handleNextMusic() {
    const currentMusic = activeMusic.id;

    if (!activeMusic) {
      return;
    }

    const filter = musics.find((music) => {
      return music.id === currentMusic + 1;
    })

    if (!filter) {
      const lastMusic = musics[0];
      return setActiveMusic(lastMusic);
    }

    setActiveMusic (filter)
  }

  return (
    <div className="container">
      <Header />
      <Main 
        setActiveMusic = {setActiveMusic}
        setPause = {setPause}

        handleMusic = {handleMusic}
      />
      <Player 
        activeMusic = {activeMusic}
        soundPlay= {soundPlay}  
        audio = {audio}
        pause = {pause}

        setSoundPlay = {setSoundPlay}
        setPause = {setPause}

        handleMusic = {handleMusic}
        handleStopMusic = {handleStopMusic}
        handlePreviousMusic = {handlePreviousMusic}
        handleNextMusic = {handleNextMusic}
        
      />
      <audio ref={audio} src={activeMusic.url}></audio>
    </div>
  );
}

export default App;