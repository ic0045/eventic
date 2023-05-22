import { createTheme, ThemeOptions } from "@mui/material";
import { green, red, teal,  } from "@mui/material/colors";

const tema:ThemeOptions = createTheme( {
    palette: {
        primary: teal,
        secondary: green,
        error: red,
    }
})

export default tema;