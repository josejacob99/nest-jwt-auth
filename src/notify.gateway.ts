import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class NotifyGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users = [];

    async handleConnection(client: Socket) {
        if(client.handshake.query.email) {
            const email = client.handshake.query.email;

            this.users.push({email,id: client.id});
        }
        this.server.emit('users', this.users);
    }

    async handleDisconnect(client: Socket) {
        this.users = this.users.filter(u => u.id !== client.id);
        this.server.emit('users', this.users);
    }

    async emitEvent(event: string, payload: any) {
        this.server.emit(event, payload);
    }

    @SubscribeMessage('spdExchange')
    initCall(@ConnectedSocket() client: Socket,@MessageBody() data: any) {
        // tslint:disable-next-line: no-console
        console.log(data);
        this.server.emit('spdExchange', data);
    }

    @SubscribeMessage('candidate')
    onCandidate(@ConnectedSocket() client: Socket,@MessageBody() data: any) {
        // tslint:disable-next-line: no-console
        console.log(data);
        this.server.emit('candidate', data);
    }

    @SubscribeMessage('get-users')
    getUsers(@ConnectedSocket() client: Socket,@MessageBody() data: any) {
        // tslint:disable-next-line: no-console
        console.log(this.users);
        this.server.emit('users', this.users);
    }
}
