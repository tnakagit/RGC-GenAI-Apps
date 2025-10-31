
import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import { useAtom } from 'jotai';
import { PromptAtom, ResponseAtom } from './openai_atoms';

const OpenAIArea = () => {
    const [prompt, setPrompt] = useAtom(PromptAtom);
    const [response, setResponse] = useAtom(ResponseAtom);
    const [loading, setLoading] = useState(false);
        
    const createPost = async () => {
        setLoading(true); // スピナー表示開始
        setResponse('');  // 前回の結果をクリア
        try {        
        //     const response = await axios.post(
        //         // 環境変数AZURE_OPENAI_ENDPOINTを使う(後ろに/openai/v1/responsesをつける)
        //         process.env.REACT_APP_AZURE_OPENAI_ENDPOINT + 'openai/v1/responses',
        //         {
        //             model: 'gpt-4.1-2025-04-14',
        //             input: prompt,
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'api-key': process.env.REACT_APP_AZURE_OPENAI_API_KEY,
        //             },
        //         }
        //     );
        //     setResponse(response.data.output[0].content[0].text);
            
        // } catch (error) {
        //     console.error('Error creating post:', error);
        //     setResponse('エラーが発生しました: ' + error.message);
        // } finally {
        //     setLoading(false); // スピナー非表示
        // }
            const response = await fetch("api/http_trigger"
                , {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt })
                })

                .then((res) => res.json())
                .then((json) => {
                    setResponse(json.data);
                })
                .catch((error) => {
                    setResponse('エラーが発生しました: ' + error.message);
                });
        } finally {
            setLoading(false); // スピナー非表示
        }

    }

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                sx={{ width: loading ? '70%' : '90%' }}
                onClick={createPost}
                disabled={loading} // ローディング中はボタン無効化
            >
                {loading ? '実行中...' : 'AI 実行!'}
            </Button>

            {loading && (
                <CircularProgress sx={{ margin: '10px auto' }} /> // スピナー表示
            )}
        </Stack>
    );
};

export default OpenAIArea;
