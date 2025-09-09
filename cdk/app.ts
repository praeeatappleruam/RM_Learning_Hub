#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RMTrainingStack } from './lib/rm-training-stack';

const app = new cdk.App();

new RMTrainingStack(app, 'RMTrainingStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-southeast-1'
  }
});

app.synth();
