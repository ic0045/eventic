import { createTheme, ThemeOptions } from "@mui/material";
import { green, red, teal,  } from "@mui/material/colors";

const tema:ThemeOptions = createTheme( {
    palette: {
        primary: teal,
        secondary: green,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    }
})

export default tema;