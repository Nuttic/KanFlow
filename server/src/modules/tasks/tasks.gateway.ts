import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TasksGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    console.log('✅ ШЛЮЗ WEBSOCKETS УСПЕШНО ИНИЦИАЛИЗИРОВАН')
  }

  handleConnection(client: Socket) {
    console.log(`⚡ Клиент подключился! ID: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Клиент отключился: ${client.id}`)
  }

@SubscribeMessage('joinCollection')
  handleJoinCollection(
    @MessageBody() collection_: number,
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = `collection_${collection_}`
    client.join(roomName);
    client.leave(roomName);
    console.log(`🚪 Клиент ${client.id} зашел в комнату: ${roomName}`)
  }
}