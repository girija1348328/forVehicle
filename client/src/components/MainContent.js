import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


function MainContent() {
    return (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 12,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Service Book</Button>
          <Button>Vehicle parts</Button>
          <Button>Others</Button>
        </ButtonGroup>

      </Box>
    )
}

export default MainContent

