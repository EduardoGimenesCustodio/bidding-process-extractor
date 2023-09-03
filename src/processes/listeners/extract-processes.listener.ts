import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ExtractProcessesEvent } from '../events/extract-processes.event';

@Injectable()
export class ExtractProcessesListener {
  @OnEvent('processes.extract')
  handleExtractProcessesEvent(event: ExtractProcessesEvent) {
    console.log(event);
  }
}
