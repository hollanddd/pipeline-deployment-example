#!/usr/bin/env node

import * as cdk from '@aws-cdk/core';
import {PipelineStack} from '../lib/pipeline-stack';

/**
 * This stack relies on retrieving the GitHub repository name and owner from CDK
 * context.
 *
 * Use 'cdk synth -c owner=github-user -c repo=name'

 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "owner": string The GitHub account/user that owns the repo.
 *     "repo":  string The name of the repo, without the username.
 *     "branch" string The branch to use.
 *   }
 * }
**/

const app = new cdk.App();
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
