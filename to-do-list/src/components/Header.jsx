import React, { useCallback } from 'react';

const Header = ({ setIsThemeLight, isThemeLight }) => {

    const onToggleTheme = useCallback(() => {
        setIsThemeLight(!isThemeLight)
    }, [setIsThemeLight, isThemeLight])
    return <div className='header'>
        <div className='logo'>
            {isThemeLight ? <img src="/img/logo-light.svg" alt="Task Managment" /> : <img src="/img/logo-dark.svg" alt="Task Managment" />}
        </div>
        <div className='theme-btn' onClick={onToggleTheme}>
            {isThemeLight ? <img src="/img/mode-light.svg" alt="dark" /> : <img src="/img/mode-dark.svg" alt="dark" />}
        </div>
        
    </div>

};

export default Header;