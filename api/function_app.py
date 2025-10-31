import azure.functions as func
import logging
import json
import os
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    prompt = req.params.get('prompt')
    if not prompt:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            prompt = req_body.get('prompt')

    if prompt:

        # 環境変数からエンドポイントとAPIキーを取得
        endpoint = os.getenv("REACT_APP_AZURE_OPENAI_ENDPOINT") + "openai/v1/responses"
        api_key = os.getenv("REACT_APP_AZURE_OPENAI_API_KEY")

        # 送信するデータ
        payload = {
            "model": "gpt-4.1-2025-04-14",
            "input": prompt
        }

        # ヘッダー
        headers = {
            "Content-Type": "application/json",
            "api-key": api_key
        }

        # POSTリクエスト
        response = requests.post(endpoint, json=payload, headers=headers)

        # レスポンスの処理
        if response.status_code == 200:
            data = response.json()
            output_text = data["output"][0]["content"][0]["text"]

            return func.HttpResponse(json.dumps({"data":output_text}), mimetype="application/json", status_code=200)
        else:
            return func.HttpResponse(
                json.dumps({"error":f"Error: {response.status_code}, {response.text}"}),
                mimetype="application/json",
                status_code=200
            )
    else:
        return func.HttpResponse(
             json.dumps({"data":"This HTTP triggered function executed successfully. Pass a prompt in the query string or in the request body for a personalized response."}),
             mimetype="application/json",
             status_code=200
        )