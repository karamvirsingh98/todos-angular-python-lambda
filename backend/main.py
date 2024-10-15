import os
import json
import boto3
import uuid

TABLE_NAME = os.environ["DYNAMODB_TABLE_NAME"]

client = boto3.client("dynamodb")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, ctx):
    print(event)

    headers = {"Content-Type": "application/json"}
    statusCode = 200

    body = {}

    # list todos
    if event["routeKey"] == "GET /todos":
        body = table.scan().get("Items")

    # get todo
    elif event["routeKey"] == "GET /todos/{id}":
        body = table.get_item(Key={"id": event.pathParameters["id"]}).get("Item")

    # create todo
    elif event["routeKey"] == "POST /todos":
        id = str(uuid.uuid4())
        table.put_item(
            Item={
                "id": id,
                "done": False,
                "title": json.loads(event["body"])["title"],
            }
        )
        body = "Created item " + id

    elif event["routeKey"] == "PUT /todos":
        parsed = json.loads(event["body"])
        table.put_item(
            Item={
                "id": parsed["id"],
                "done": parsed["done"],
                "title": parsed["title"],
            }
        )
        body = "Put item " + parsed['id']

    # delete todo
    elif event["routeKey"] == "DELETE /todos/{id}":
        table.delete_item(Key={"id": event["pathParameters"]["id"]})
        body = "Deleted item " + event["pathParameters"]["id"]

    body = json.dumps(body)

    res = {
        "statusCode": statusCode,
        "headers": headers,
        "body": body,
    }

    return res
