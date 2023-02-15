import { createTheme } from '@mui/material/styles';

const lightTheme = {
  palette: {
    primary: {
      light: '#fff463',
      main: '#f9c22d',
      dark: '#c29200',
      contrastText: '#000000',
    },
    secondary: {
      light: '#9c786c',
      main: '#6d4c41',
      dark: '#40241a',
      contrastText: '#ffffff',
    },
  }
};

const darkTheme = {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
};

const themes = {
  light: createTheme(lightTheme),
  dark: createTheme(darkTheme)
};

export default themes;