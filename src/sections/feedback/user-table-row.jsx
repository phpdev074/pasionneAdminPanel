import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  email,
  mobileNumber,
  title,
  message,
  
  
}) {







  return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          &nbsp;
        </TableCell>

        <TableCell component="th" scope="row" align="center" padding="none">
          <Stack direction="row" alignItems="right" spacing={1}>
            <Typography align="right">
              { name }
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{ email }</TableCell>
        <TableCell>{ mobileNumber }</TableCell>
        <TableCell>{ title }</TableCell>
        <TableCell align="center">{ message }</TableCell>

      </TableRow>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.string,
  mobileNumber: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  selected: PropTypes.bool,
};
