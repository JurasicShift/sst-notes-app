import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {

    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
            noteId: event?.pathParameters?.id,
        },

        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },

        ReturnValues: "ALL_NEW",
    }

    const result = await dynamoDb.update(params);
    console.log(`ALL_NEW_RESULTS: ${JSON.stringify(result)}`);
    return JSON.stringify({status: true});

})