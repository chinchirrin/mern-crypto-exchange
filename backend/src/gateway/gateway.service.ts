import { Injectable, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  @WebSocketServer() webSocket: Server;

  @SubscribeMessage('updateData')
  broadcastUpdate() {
    this.webSocket.emit('onUpdateData');
    this.logger.log('updateData message was broadcasted to clients!');
  }
}
