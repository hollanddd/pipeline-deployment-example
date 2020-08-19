import {CfnOutput, Construct, Stage, StageProps} from '@aws-cdk/core';
import {IotBootstrapStack} from './iot-bootstrap-stack';

export class BootstrapStage extends Stage {
  public readonly urlOutput: CfnOutput;
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new IotBootstrapStack(this, 'BootstrapService');
    this.urlOutput = service.urlOutput;
  };
}

