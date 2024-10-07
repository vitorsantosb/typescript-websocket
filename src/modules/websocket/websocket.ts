import {Server} from 'socket.io';
import { Server as HttpServer } from 'http';
import {ApiLogMessage} from '@configs/logs/logMessages';

const io = new Server();

export function SetupWebSocket(server: HttpServer) {
	const io = new Server(server, {
		cors: {
			origin: ['http://localhost:3001'],
			methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
			allowedHeaders: ['Access-Control-Allow-Origin','Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
			credentials: true,
		},
	});
	
	io.on('connection', (socket) => {
		ApiLogMessage('[WEBSOCKET_SERVER]','New client connected:', socket.id);
		
		socket.on('message', (data) => {
			ApiLogMessage('[WEBSOCKET_SERVER]','Message received:', data);
			io.emit('message', data); // Reenvia a mensagem para todos os clientes
		});
		
		socket.on('client_connected', (data) => {
			ApiLogMessage('[WEBSOCKET_SERVER]','Client connected:', socket.id);
			
		})
		
		socket.on('disconnect', () => {
			ApiLogMessage('[WEBSOCKET_SERVER]','Client disconnected:', socket.id);
		});
	});
	
	return io;
}