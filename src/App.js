import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import LeftArea from './LeftArea';

function App() {
  return (
    <Box sx={{width: 'auto',height: "100vh",backgroundColor: '#f0f0f0'}}>
      {/* マージンを20px取った内枠 */}
      <Box sx={{padding: '20px', width:"auto", height: "95%"}}>
        {/* 縦方向に分割 */}
        <Stack sx ={{  width: "auto", height: "100%"}} spacing={2}>
            {/* 1番上のエリア */}
            <Paper elevation={3} sx = {{textAlign: 'center',fontSize: '40px',width: "100%", height: 60, backgroundColor: 'white', boxShadow: 3}}>
              TitleArea
            </Paper>
            {/* 2番目のエリア */}
            <Stack sx ={{width: "auto", height: "100%"}}spacing={2} direction={"row"}>
              {/* 横方向に分割 */}
              <Paper elevation={3} sx = {{flex: 1, textAlign: 'center',fontSize: '40px',width: "100%", height: "100%", backgroundColor: 'white', boxShadow: 3}}>
                <LeftArea />
              </Paper>
              <Paper elevation={3} sx = {{flex: 3, textAlign: 'center',fontSize: '40px',width: "100%", height: "100%", backgroundColor: 'white', boxShadow: 3}}>
                Right Area
              </Paper>
            </Stack>
            {/* 3番目のエリア */}
            <Paper elevation={3} sx = {{textAlign: 'center',fontSize: '40px',width: "100%", height: 60, backgroundColor: 'white', boxShadow: 3}}>
              footer Area
            </Paper>
          </Stack>
      </Box>
    </Box>

  )
}

export default App;
