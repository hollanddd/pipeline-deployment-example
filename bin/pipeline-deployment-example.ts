#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineDeploymentExampleStack } from '../lib/pipeline-deployment-example-stack';

import { PipelineStack } from '../lib/pipeline-stack';
const app = new cdk.App();
new PipelineDeploymentExampleStack(app, 'PipelineDeploymentExampleStack');

new PipelineStack(app, 'ExamplePipelineStack', {
  repo: {
    owner:  app.node.tryGetContext('owner'),
    name:   app.node.tryGetContext('reponame'),
    branch: app.node.tryGetContext('branch'),
  },
  env: {
    account: cdk.Aws.ACCOUNT_ID,
    region: cdk.Aws.REGION,
 },
});

app.synth();

