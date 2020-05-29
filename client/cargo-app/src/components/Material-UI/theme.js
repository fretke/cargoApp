import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#8bc34a"
        },
        secondary: {
            main: "#ff1744"},
        },
  status: {
    danger: 'orange',
  }
});

export default theme;