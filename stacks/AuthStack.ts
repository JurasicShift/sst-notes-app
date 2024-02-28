import { ApiStack } from "./ApiStack";
import * as iam from "aws-cdk-lib/aws-iam";
import { StorageStack } from "./StorageStack";
import { Cognito, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
    const { api } = use(ApiStack);
    const { bucket } = use(StorageStack);

    const auth = new Cognito(stack, "Auth", {
        login: ["email"],
    });

    auth.attachPermissionsForAuthUsers(stack, [
        api,
        new iam.PolicyStatement({
            actions: ["s3:*"],
            effect: iam.Effect.ALLOW,
            resources: [
                bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
            ],
        }),
    ]);

    stack.addOutputs({
        Region: app.region,
        UserPoolId: auth.userPoolId,
        UserPoolClientId: auth.userPoolClientId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
    });

    return {
        auth,
    }
}

// aws cognito-idp sign-up \ 
// --region us-east-1 \
// --client-id in7d77bj1c7qa8o2co35k1hqi \
// --username crazykiss@aol.com \
// --password Mustain97!

//  aws cognito-idp admin-confirm-sign-up --region us-east-1 --user-pool-id us-east-1_vaQK8Azg6 --username admin@example.com

//  apig-test aws-api-gateway-cli-test --username "crazykiss@aol.com" --password "Mustain97!" --user-pool-id us-east-1_vaQK8Azg6 --app-client-id in7d77bj1c7qa8o2co35k1hqi --cognito-region us-east-1 --identity-pool-id us-east-1:bd727607-7dc9-46a8-90fa-1ab1343bcb3e --invoke-url "https://iakzdwnsq7.execute-api.us-east-1.amazonaws.com/" --api-gateway-region us-east-1 --path-template "notes" --method "POST" --body "{\"content\":\"Jurassic Park\",\"attachment\":\"alansback.jpg\"}"

