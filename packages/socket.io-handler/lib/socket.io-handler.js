import { AbstractLevelBubbleHandler, } from '@livy/util/handlers/abstract-level-bubble-handler';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { io } from 'socket.io-client';
/**
 * Sends log records to a Socket.IO server
 *
 * @see https://socket.io
 */
export class SocketIoHandler extends ProcessableHandlerMixin(AbstractLevelBubbleHandler) {
    connection;
    url;
    connectionOptions;
    constructor(url, { connection = {}, ...options } = {}) {
        super(options);
        this.url = url;
        this.connectionOptions = connection;
    }
    /**
     * Connect to the Socket.IO server
     */
    async connect() {
        await this.makeConnection();
    }
    /**
     * Get a connection to the Socket.IO server
     */
    makeConnection() {
        if (this.connection) {
            return this.connection;
        }
        this.connection = new Promise((resolve, reject) => {
            const socket = io(this.url, this.connectionOptions);
            socket.on('connect', () => {
                resolve(socket);
            });
            socket.on('disconnect', () => {
                this.connection = undefined;
            });
            socket.on('connect_error', (error) => {
                reject(error);
            });
        });
        return this.connection;
    }
    /**
     * @inheritdoc
     */
    close() {
        if (this.connection) {
            this.connection.then(socket => {
                socket.close();
            });
        }
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        if (!this.isHandling(record.level)) {
            return;
        }
        const connection = await this.makeConnection();
        connection.emit('log', record);
        return !this.bubble;
    }
    /**
     * @inheritdoc
     */
    async handleBatch(records) {
        if (!records.some(record => this.isHandling(record.level))) {
            return;
        }
        const connection = await this.makeConnection();
        for (const record of records) {
            connection.emit('log', record);
        }
    }
}
