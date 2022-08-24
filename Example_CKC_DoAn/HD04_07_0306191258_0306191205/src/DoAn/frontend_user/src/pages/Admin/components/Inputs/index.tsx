import { useState, memo } from 'react';
import { OutlinedInput, FormControl, InputAdornment, IconButton, OutlinedInputProps } from '@mui/material';
import classes from './styles.module.scss';
import iconEyeOpen from 'assets/img/icon/eye-open.svg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import clsx from 'clsx';


import ErrorMessage from './components/ErrMess';
import images from 'config/images';
import TextTitle from './components/TextTitle';



interface InputsProps extends OutlinedInputProps {
  title?: string,
  titleRequired?: boolean,
  placeholder?: string,
  name?: string,
  type?: string,
  defaultValue?: string,
  value?: string | number,
  showEyes?: boolean,
  root?: string,
  className?: any,
  inputRef?: any,
  autoComplete?: string,
  errorMessage?: string | null,
  optional?: boolean,
  infor?: string
}
const Inputs = memo((props: InputsProps) => {
 

  const [toggleEyes, setToggleEyes] = useState(false);
  const { title,
    placeholder,
    name,
    defaultValue,
    value,
    type,
    root,
    className,
    showEyes,
    inputRef,
    errorMessage,
    autoComplete,
    optional,
    infor,
    titleRequired,
    ...rest
  } = props;

  const handleClick = () => {
    setToggleEyes(!toggleEyes);
  }

  const { ref: refInput, ...inputProps } = inputRef || { ref: null }

  return (
    <FormControl className={clsx(classes.root, root)}>
      {title && (
        <TextTitle>{title}
          {optional ? <span className={classes.optional}> ('common_optional')</span> : ""}
          {titleRequired ? <span className={classes.titleRequired}> *</span> : ""}
        </TextTitle>
      )}
      <OutlinedInput
        type={!toggleEyes ? type : 'text'}
        placeholder={placeholder}
        fullWidth
        name={name}
        defaultValue={defaultValue}
        value={value}
        variant="standard"
        classes={{ root: clsx(!errorMessage ? classes.inputTextfield : classes.inputInvalid) }}
        className={className}
        autoComplete={autoComplete}
        endAdornment={!errorMessage ?
          showEyes && <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
              className={classes.iconEye}>
              {/* {toggleEyes ? <img src={iconEyeOpen} alt="eye-close" /> : <VisibilityOffIcon />} */}
            </IconButton>
          </InputAdornment> : <img src={images.icErr} alt="error" />
        }
        {...inputProps}
        inputRef={refInput}
        {...rest}
      />
      {infor && <p className={classes.textInfor}>{infor}</p>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormControl>
  );
});
export default Inputs;



