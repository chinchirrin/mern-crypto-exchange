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

  /**
   * Broadcast to clients that a batch insert of crypto prices has been made
   * They can pull the latest data
   */
  @SubscribeMessage('newRecord')
  broadcastNewRecord() {
    this.logger.log('"receivedNewRecord" was broadcasted ...');

    this.webSocket.emit('receivedNewRecord');
  }

  /**
   * Will be used to broadcast that new crypto prices have been pulled from an
   * API endpoint
   */
  emitNewLivePrices(payload: Array<object>) {
    this.webSocket.emit('newLivePrices', payload);

    this.logger.log('"newLivePrices" was broadcasted ...');
    this.logger.log(payload.slice(0, 1));
  }
}
