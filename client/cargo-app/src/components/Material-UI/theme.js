import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#8ccbbe'
        },
        secondary: {
            main: "#393e46"},
      },
  status: {
    danger: 'orange',
  },
});

export default theme;