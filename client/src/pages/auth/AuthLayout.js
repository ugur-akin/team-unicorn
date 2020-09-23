import {Grid, makeStyles, Box, Hidden} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import AuthImg from './authPageImg.png';
import CenteringBox from '../../components/CenteringBox';
import AuthSnackbar from '../../components/AuthSnackbar';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  img: {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    verticalAlign: 'middle',
  },
  imgCol: {
    height: '100%',
  },
  footer: {
    height: '100px',
  },
});

// TODO:  Instead of hiding picture on small screens,
//        consider putting it in bg.
//        Also consider debouncing and moving components
//        dynamically (i.e. smoothly) upon resize.
const AuthLayout = ({
  formContainer: FormContainer,
  footer: FooterComponent,
}) => {
  const classes = useStyles();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  // const [snackSeverity, setSnackSeverity] = useState("error")

  const openSnackbar = useCallback((message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  }, []);
  const closeSnackbar = useCallback(() => {
    setSnackOpen(false);
    setSnackMessage('');
  }, []);

  const FormContainerWithFormProps = React.cloneElement(FormContainer, {
    formProps: {openSnackbar},
  });

  return (
    <Grid
      className={classes.root}
      direction="row"
      alignItems="stretch"
      container
    >
      <Hidden smDown>
        <Grid item md className={classes.imgCol}>
          <img className={classes.img} src={AuthImg} alt="KanBan Homepage" />
        </Grid>
      </Hidden>

      <Grid
        item
        component={Box}
        display="flex"
        flexDirection="column"
        className={classes.formCol}
        md
        xs={12}
      >
        <AuthSnackbar
          open={snackOpen}
          message={snackMessage}
          severity="error"
          onClose={closeSnackbar}
        />
        <CenteringBox flexGrow={1}>{FormContainerWithFormProps}</CenteringBox>
        <CenteringBox
          className={classes.footer}
          borderTop={1}
          borderColor="grey.300"
        >
          {FooterComponent}
        </CenteringBox>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
