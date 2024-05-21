import bgImgDesktop from '../../assets/pattern-bg-desktop.png';
import bgImgMobile from '../../assets/pattern-bg-mobile.png';

const Header: React.FC = () => {

    return (
        <header>
            <picture>
                <source media="(min-width: 765px)" srcSet={bgImgDesktop.src} />
                <img src={bgImgMobile.src} alt="mobile background image" className="w-full h-full object-cover" />
            </picture>
        </header>
    );

};


export default Header;