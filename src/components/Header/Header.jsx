import './Header.css';
import Logo from '../../assets/logo.svg';
import Perfil from '../../assets/profile.jpg';

export default function Header() {
    return (
        <div className='Cubos-Player'>
            <img className="Logo" src={Logo} alt='Logo da página'/>

            <div className='Bem-vindo'>
                <img src={Perfil} alt='Foto de perfil'/>
                <strong>Bem vindo, Diogo.</strong>
            </div>
        </div>
    )
}