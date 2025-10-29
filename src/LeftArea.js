
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';


const LeftArea = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
        
    const createPost = async () => {
        try {
            const response = await axios.post(
                // 環境変数AZURE_OPENAI_ENDPOINTを使う(後ろに/openai/v1/responsesをつける)
                process.env.REACT_APP_AZURE_OPENAI_ENDPOINT + 'openai/v1/responses',
                {
                    model: 'gpt-4.1-2025-04-14',
                    input: prompt,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': process.env.REACT_APP_AZURE_OPENAI_API_KEY,
                    },
                }
            );
            setResponse(response.data.output[0].content[0].text);
        } catch (error) {
            console.error('Error creating post:', error);
            setResponse('エラーが発生しました: ' + error.message);
        }
    }

    return (
        <Stack sx={{ width: '100%', height: '100%', padding: '20px'}} spacing={2}>
        <TextField 
            sx={{ width: '90%' }} 
            id="prompt" 
            label="プロンプト" 
            placeholder='プロンプトを入力してください' 
            variant="outlined" 
            multiline rows={8}
            onChange={(e) => setPrompt(e.target.value)}
        />

        <Button variant="contained" sx={{width: '90%'}} onClick={createPost}> AI 実行!</Button>
        <TextField 
            sx={{ width: '90%' }} 
            id="output" 
            label="生成物" 
            placeholder='生成物がここに表示されます' 
            variant="outlined" 
            multiline rows={20}
            value={response}

            slotProps={{
                inputLabel: {
                    shrink: true, // ラベルを常に縮小表示
                }
            }}
        />

        </Stack>
    );
};

export default LeftArea;
