import * as path from 'path';

import { TaskLibAnswerExecResult } from 'vsts-task-lib/mock-answer';
import * as tmrm from 'vsts-task-lib/mock-run';

import { NpmCommand, NpmTaskInput, RegistryLocation } from '../constants';
import { NpmMockHelper } from './NpmMockHelper';

let taskPath = path.join(__dirname, '..', 'npm.js');
let tmr = new NpmMockHelper(taskPath);

tmr.setInput(NpmTaskInput.Command, NpmCommand.Publish);
tmr.setInput(NpmTaskInput.WorkingDir, 'workingDir');
tmr.setInput(NpmTaskInput.PublishRegistry, RegistryLocation.Feed);
tmr.setInput(NpmTaskInput.PublishFeed, 'SomeFeedId');
tmr.mockNpmCommand('publish', {
    code: 0,
    stdout: 'npm publish successful'
} as TaskLibAnswerExecResult);
tmr.answers.rmRF['workingDir\\.npmrc'] = { success: true };
tmr.RegisterLocationServiceMocks();

tmr.run();
