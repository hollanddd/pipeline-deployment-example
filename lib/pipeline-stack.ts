import {CdkPipeline, SimpleSynthAction} from '@aws-cdk/pipelines';
import {Artifact} from '@aws-cdk/aws-codepipeline';
import {GitHubSourceAction} from '@aws-cdk/aws-codepipeline-actions';
import {Construct, Stack, StackProps, SecretValue} from '@aws-cdk/core';

export interface PipelineProps extends StackProps {
  repo: {
    branch: string,
    owner: string,
    name: string,
  },
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'SevicePipeline',
      cloudAssemblyArtifact,
      sourceAction: new GitHubSourceAction({
        actionName: 'GitHub Source',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('github'),
        owner: props.repo.owner,
        repo: props.repo.owner,
        branch: props.repo.branch,
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: 'make build'
      }),
    });

    // TODO: Add application stages

  }
}
