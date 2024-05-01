import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  emitNotification(notification: any) {
    this.server.emit('notification', notification);
  }

  @SubscribeMessage('sendNotification')
  handleNotification(client: Socket, notification: any) {
    this.server.emit('notification', notification);
  }
}
