// On material UI them - https://www.youtube.com/watch?v=xIIJfmDnvPE
// Material UI default theme - https://material-ui.com/customization/default-theme/
import {
  createTheme
} from "@material-ui/core";
import {
  COLORS
} from "../utils/colors";

const theme = createTheme({
  // TODO: UPDATE THIS PALETTE
  palette: {
    // primary: {
    //   main: '#fefefe',
    // },
    // secondary: {
    // main: '#fff',
    // }
  },
  typography: {
    h2: {
      fontSize: '18pt',
      fontWeight: 500,
    },
    h3: {
      fontSize: '14pt',
    },
    h4: {
      fontSize: '13pt',
    },
    body1: {
      fontSize: '10pt',
    },
    body2: {
      fontSize: '8pt',
    }
  },
  background: {
    default: COLORS.LIGHT_GREY,
  }
})

export default theme;