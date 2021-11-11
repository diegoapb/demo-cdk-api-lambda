import * as cdk from "@aws-cdk/core";
//import Function
import { Code, Function as LambdaFunction, Runtime } from "@aws-cdk/aws-lambda";
//import Bucket
import { Bucket } from "@aws-cdk/aws-s3";
//import API
import { RestApi, LambdaIntegration } from "@aws-cdk/aws-apigateway";

//import utils path
import { join } from "path";
export class DemoCdkApiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    //Handler
    const handler = new LambdaFunction(this, "HelloHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, "../services")),
      handler: "greeting.sayHello",
    });

    //API Gateway
    const api = new RestApi(this, "HelloRestApi");

    //Integration POST /hello with Lambda
    api.root
      .resourceForPath("/hello")
      .addMethod("POST", new LambdaIntegration(handler));
  }
}
