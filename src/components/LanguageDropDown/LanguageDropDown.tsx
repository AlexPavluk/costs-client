import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import './style.scss'


export const LanguageDropDown = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickChangeLanguage = (languages: any) => {
        console.log(languages)
        i18n.changeLanguage(languages);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <img src="./langicon.png" alt="lang" />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <MenuItem onClick={() => onClickChangeLanguage("en")}>English</MenuItem>
                <MenuItem onClick={() => onClickChangeLanguage("ro")}>Română</MenuItem>
                <MenuItem onClick={() => onClickChangeLanguage("ru")}>Русский</MenuItem>
                <MenuItem onClick={() => onClickChangeLanguage("ua")}>Україньська</MenuItem>

            </Menu>
        </div>
    );
}