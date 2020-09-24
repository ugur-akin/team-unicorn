import React from 'react';
import PlusIcon from '@material-ui/icons/AddOutlined';
import {Button} from '@material-ui/core';

const CreateBoard = () => {
  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<PlusIcon />}
      size="medium"
    >
      Create New Board
    </Button>
  );
};

export default CreateBoard;
