import React, {useContext} from 'react';
import {makeStyles, Box, TextField, Button} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import formProps from '../formProps';
import formValidation from '../formValidation';
import User from '../../../api/User';
import UserContext from '../../../contexts';

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const SignupForm = ({openSnackbar}) => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    errors: formErrors,
  } = useForm({
    mode: 'onTouched',
  });
  const userContext = useContext(UserContext);

  const onSubmit = async (data) => {
    const {success, data: apiData, errors: apiErrors} = await User.create(data);
    if (success) {
      const {user} = apiData;
      userContext.setUser(user);
      userContext.setAuthenticated(true);
      openSnackbar('Success!', 'success');
    } else {
      const errorKeys = Object.getOwnPropertyNames(apiErrors);
      const message = apiErrors[errorKeys[0]];
      openSnackbar(message, 'error');
    }
  };

  const {
    name: fullNameHTMLProps,
    email: emailHTMLProps,
    password: passwordHTMLProps,
    confirmPassword: confirmPasswordHTMLProps,
  } = formProps.html.signup;
  const {textField: textFieldStyleProps} = formProps.style;

  const {
    name: fullNameValidation,
    email: emailValidation,
    password: passwordValidationFactory,
    confirmPassword: confirmPasswordValidationFactory,
  } = formValidation.signup;

  // NOTE: Password validation needs to trigger password confirmation
  //      validation, so the config takes a callback to trigger it.
  //      Similarly, password confirmation validation needs
  //      the password's value, hence the config takes a callback to retrive it.
  const passwordValidation = passwordValidationFactory(() =>
    trigger(confirmPasswordHTMLProps.name),
  );
  const confirmPasswordValidation = confirmPasswordValidationFactory(() =>
    getValues(passwordHTMLProps.name),
  );

  const classes = useStyles();

  return (
    <Box
      id="signup"
      component="form"
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        {...textFieldStyleProps}
        {...fullNameHTMLProps}
        inputRef={register(fullNameValidation)}
        {...formValidation.getMuiErrorProps(formErrors, fullNameHTMLProps.name)}
        required
      />

      <TextField
        {...emailHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(emailValidation)}
        {...formValidation.getMuiErrorProps(formErrors, emailHTMLProps.name)}
      />
      <TextField
        {...passwordHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(passwordValidation)}
        {...formValidation.getMuiErrorProps(formErrors, passwordHTMLProps.name)}
        required
      />
      <TextField
        {...confirmPasswordHTMLProps}
        {...textFieldStyleProps}
        inputRef={register(confirmPasswordValidation)}
        {...formValidation.getMuiErrorProps(
          formErrors,
          confirmPasswordHTMLProps.name,
        )}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
