import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: "123", 
      noteId: uuid.v1(), 
      content: data.content, 
      attachment: data.attachment, 
      createdAt: Date.now(), 
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});

// curl -X POST \
// -H 'Content-Type: application/json' \
// -d '{"content":"Hello World","attachment":"hello.jpg"}' \
// https://iakzdwnsq7.execute-api.us-east-1.amazonaws.com/notes

//"noteId":"4378944d-912b-4390-84e1-637688f1c9e3",

// https://iakzdwnsq7.execute-api.us-east-1.amazonaws.com/notes/"4378944d-912b-4390-84e1-637688f1c9e3"

// curl -X PUT \
// -H 'Content-Type: application/json' \
// -d '{"content":"Again In a Brave New World","attachment":"holland99.jpg"}' \
// https://iakzdwnsq7.execute-api.us-east-1.amazonaws.com/notes/4378944d-912b-4390-84e1-637688f1c9e3