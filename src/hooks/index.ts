import { useEffect, useState } from 'react';
export const useTheme = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string) || 'dark')
    const darkTheme = "https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css";
    const ligthTheme = "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css";

const setCurrentMode = (theme: string) => {
    const linkThemeId = document.getElementById('theme-link') as HTMLLinkElement;
        linkThemeId.href = theme === 'dark' ? darkTheme : ligthTheme;
}

    const switchTheme = () => {
        const inverseMode = theme === 'dark' ? 'ligth' : 'dark';
        localStorage.setItem('theme', JSON.stringify(inverseMode));

        setCurrentMode(theme);

        setTheme(inverseMode);
    }

    useEffect(() => {
        setCurrentMode(theme)
    }, [theme])

    return { switchTheme, theme }
    
}