import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#73A184',
      contrastText: '#F8F8F8'
    },
    secondary: {
      main: '#5F76BA',
      contrastText: '#F8F8F8'
    },
    error: {
      main: '#D9826E',
      contrastText: '#F8F8F8'
    },
    onPrimary: '#F8F8F8',
    onSecondary: '#333333'
  },
  typography: {
    fontFamily: [
      'Sarabun',
      'sans-serif'
    ].join(','),
    htmlFontSize: 16,
    fontWeight: 300,
    fontWeightMedium: 400,
    useNextVariants: true
  },

});

export default theme
