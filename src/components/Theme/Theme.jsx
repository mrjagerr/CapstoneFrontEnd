import { createTheme } from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";


const Theme  = createTheme({
    palette:{
        primary:{
            main: blue [800],
        },
        secondary:{
            main: grey[400],
        }
    }
});
export default Theme ;