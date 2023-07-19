import './Player.css';
import Stop from '../../assets/stop.svg';
import Pause from '../../assets/pause.svg';
import Play from '../../assets/play.svg';
import Previous from '../../assets/previous.svg'
import Next from '../../assets/next.svg';
import { useEffect, useRef } from 'react';

export default function Player({activeMusic, soundPlay, setSoundPlay, handleMusic, handleStopMusic, handlePreviousMusic, handleNextMusic, audio, pause, setPause}) {

    const progressRef = useRef(null);
    
    let intervalProgress = null;

    useEffect(() => {
        intervalProgress = setInterval(() => {
            if (!soundPlay) {
                clearInterval(intervalProgress);
            }

            if (pause === true && !soundPlay) {
                progressRef.current.style.width = "0px"
            }

            if (soundPlay) {
                
            const duration = audio.current.duration / 60;
            const currrentProgress = ((audio.current.currentTime / 60) * 560) / duration

            progressRef.current.style.width = `${currrentProgress}px`
            }
        }, 1000)
    }, [soundPlay])

    function handleStop() {
        if (activeMusic.url) {
            handleStopMusic();
            setPause(true);
            audio.current.currentTime = 0;
        }
    }

    function handlePrevious() {
        if (!activeMusic.id) {
            return;
        }

        handlePreviousMusic();
        handleMusic();
        audio.current.currentTime = 0;
    }

    function handleNext() {
        if (!activeMusic.id) {
            return;
        }

        handleNextMusic();
        handleMusic();
        audio.current.currentTime = 0;
    }

    function playPause() { 

        if (!activeMusic.url) {
            return;
        }

        if (!soundPlay) {
            audio.current.play();
            setSoundPlay(!soundPlay);
            setPause(false);
            return;
        }

        if (progressRef.current.style.width > `${560}px`) {
            return;
        }

        audio.current.pause();
        setSoundPlay(!soundPlay);
    }
    
    return (
        <div className='player'>
            <div className="description-player">
                <h3>{activeMusic.title}</h3>
                <strong>{activeMusic.artist}</strong>
            </div>

            <div className="panel-controls">
                <div className='controls'>
                    <img onClick={() => handleStop()} src={Stop} alt="Botão de parar a musica" />
                    <img onClick={() => handlePrevious()} src={Previous} alt="Botão de voltar uma música"/>
                    <img onClick={() => playPause()} src={soundPlay ? Pause : Play} alt="botão de pausar e inicar a musica" />  
                    <img onClick={() => handleNext()} src={Next} alt="Botão de avançar uma música" />
                </div>

                <div className="template-bar">
                    <strong>{activeMusic.url ? "0.00": ""}</strong>
                        <div className='progress-bar'>
                            <div ref={progressRef} className='progress'>
                            </div>
                        </div>  
                    <strong>{activeMusic.url ? "2.34" : ""}</strong>  
                </div>
            </div>
        </div>
    )
}