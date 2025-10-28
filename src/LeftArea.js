
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const LeftArea = () => {
    const [prompt, setPrompt] = useState('');
    return (
        <Stack sx={{ width: '100%', height: '100%', padding: '20px'}}>
        <TextField 
            sx={{ width: '90%' }} 
            id="prompt" 
            label="プロンプト" 
            placeholder='プロンプトを入力してください' 
            variant="outlined" 
            multiline rows={8}
            onChange={(e) => setPrompt(e.target.value)}
        />

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            入力されたプロンプト: {prompt}
        </Typography>
        
        </Stack>
    );
};

export default LeftArea;
