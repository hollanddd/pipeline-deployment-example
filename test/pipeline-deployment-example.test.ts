import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PipelineDeploymentExample from '../lib/pipeline-deployment-example-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PipelineDeploymentExample.PipelineDeploymentExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
