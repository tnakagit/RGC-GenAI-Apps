
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


import { useAtom } from 'jotai';
import { atom } from 'jotai'

const PromptAtom = atom('');
const ResponseAtom = atom('');

const LeftArea = () => {
    const [prompt, setPrompt] = useAtom(PromptAtom);
    const [response, setResponse] = useAtom(ResponseAtom);

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
