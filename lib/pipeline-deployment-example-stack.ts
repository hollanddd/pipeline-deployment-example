import * as golang from 'aws-lambda-golang';
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class PipelineDeploymentExampleStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new golang.GolangFunction(this, 'func'); 

    const api = new apigateway.LambdaRestApi(this, 'myapi', {
      handler,
      proxy: false,
    });

    const items = api.root.addResource('hello');
    items.addMethod('GET');

    this.urlOutput = new cdk.CfnOutput(this, 'ApiURL', {
      value: api.url,
    });
  }
}
