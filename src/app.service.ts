import { Injectable } from '@nestjs/common';
import { NotifyGateway } from './notify.gateway';

@Injectable()
export class AppService {

  constructor(private notify: NotifyGateway) {}
  getHello(): string {
    this.notify.emitEvent('users','hello');
    return 'Hello World!';
  }
}
