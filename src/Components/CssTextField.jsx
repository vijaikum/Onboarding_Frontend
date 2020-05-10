import { TextField, withStyles } from '@material-ui/core'

const CssTextField = withStyles({
    root: {
        '& label.MuiFormLabel-root': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& input.MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

export default CssTextField;