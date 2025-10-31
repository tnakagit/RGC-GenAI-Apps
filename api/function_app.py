import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="http_trigger")
def http_trigger(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(json.dumps({"data":f"Hello, {name}. This HTTP triggered function executed successfully."}), mimetype="application/json", status_code=200)
    else:
        return func.HttpResponse(
             json.dumps({"data":"This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."}),
             mimetype="application/json",
             status_code=200
        )