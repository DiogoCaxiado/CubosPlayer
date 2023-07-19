import './Main.css';
import musics from '../../musics';

export default function Main({setActiveMusic, handleMusic, setPause}) {
    
    function handleClick(music) {
        setActiveMusic(music);
        handleMusic();
        setPause(false);
    }

    return (
        <div className='Main'>
            <div className='Content'>
              <h2>The best play list</h2>  
            
            <div className='Playlist'>      
                {musics.map((music) => (
                    <div onClick={() => handleClick(music)} className="Album" key={music.id}>
                            <img src={music.cover} alt="Foto da musica" />
                            <h3>{music.title}</h3>
                            <p>{music.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}