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
   * Will be used to broadcast that new crypto prices have been pulled from an
   * API endpoint
   */
  broadcastBatchUpdate(payload: object) {
    this.webSocket.emit('onUpdatedPrices', payload);

    this.logger.log('"onUpdatedPrices" was broadcasted ...');
  }

  /**
   * Broadcast to clients that a batch insert of crypto prices has been made
   * They can pull the latest data
   */
  broadcastNewRecord(payload: object) {
    this.webSocket.emit('onNewRecord', payload);

    this.logger.log('"onNewRecord" was broadcasted ...');
  }
}
