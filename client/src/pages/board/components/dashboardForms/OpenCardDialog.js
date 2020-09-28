import {Button} from '@material-ui/core';
import React, {useState} from 'react';
import CardDialog from './CardDialog';

// TODO(FS): Create color labels for users, where they
//           can edit/define new colors and their associated
//           labels.
const sampleCard = {
  title: 'Sample Card',
  columnName: 'Col',
  desc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum dolor at eleifend aliquam. Cras condimentum erat eget purus fermentum faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada.',
  deadline: Date.now(),
  tags: ['math', 'exam', 'important'],
  color: 'primary',
  comments: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare quam ac condimentum accumsan. Nulla eu efficitur dui, vitae gravida felis. In vitae turpis at nunc tincidunt vestibulum. Nulla facilisi. Nunc nisi est, efficitur in lobortis at, dapibus ac diam. Nunc a elit volutpat enim sodales porttitor at id lacus. Cras non tempor justo.',
    'Donec eu semper lacus, vitae vehicula nisl. Nullam sed mi vulputate, laoreet tellus id, porta neque. Nullam semper placerat nisi, sit amet gravida est gravida vel. Ut ut purus pulvinar velit ultrices pellentesque vel sit amet nisi.',
  ],
  attachements: null,
};

const OpenEditCardDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => !open && setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    title,
    columnName,
    desc,
    deadline,
    tags,
    color,
    comments,
    attachements,
  } = sampleCard;

  return (
    <>
      <CardDialog
        open={open}
        columnName={columnName}
        title={title}
        desc={desc}
        deadline={deadline}
        color={color}
        comments={comments}
        tags={tags}
        attachements={attachements}
        onClose={handleClose}
        onExit={() => console.log('This is where we save.')}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Open Edit Dialog
      </Button>
    </>
  );
};

export default OpenEditCardDialog;
