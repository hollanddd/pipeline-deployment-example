#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineDeploymentExampleStack } from '../lib/pipeline-deployment-example-stack';

const app = new cdk.App();
new PipelineDeploymentExampleStack(app, 'PipelineDeploymentExampleStack');
