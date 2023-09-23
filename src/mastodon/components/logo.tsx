// @ts-nocheck
import logo from 'mastodon/../images/logo.svg';

export const WordmarkLogo: React.FC = () => (
    <svg viewBox='0 0 75 16' className='logo logo--wordmark' role='img'>
        <title>RaRu.Re</title>
        <use xlinkHref='#logo-symbol-wordmark' />
    </svg>
);

export const SymbolLogo: React.FC = () => (
    <img src={logo} alt='RaRu.Re' className='logo logo--icon' />
);
