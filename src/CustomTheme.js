import { createTheme,ThemeProvider } from "@mui/material"
import { lightGreen } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";
// "#a5949c"
//#553e52


const theme = createTheme({
  palette: {
    primary: {
      main: "#5d756c",
    },
    secondary:{
        main:"#755d66",
    }
  },
});
const CustomTheme = (props) => {
    const{children} = props
    return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

export default CustomTheme