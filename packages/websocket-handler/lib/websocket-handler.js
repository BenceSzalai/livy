import { JsonFormatter } from '@livy/json-formatter';
import { AbstractLevelBubbleHandler, } from '@livy/util/handlers/abstract-level-bubble-handler';
import { FormattableHandlerMixin } from '@livy/util/handlers/formattable-handler-mixin';
import { ProcessableHandlerMixin } from '@livy/util/handlers/processable-handler-mixin';
import { Socket } from 'engine.io-client';
/**
 * Sends log records to a WebSocket server
 */
export class WebSocketHandler extends FormattableHandlerMixin(ProcessableHandlerMixin(AbstractLevelBubbleHandler)) {
    connection;
    url;
    connectionOptions;
    constructor(url, { connection = {}, formatter, ...options } = {}) {
        super(options);
        this.url = url;
        this.connectionOptions = connection;
        this.explicitFormatter = formatter;
    }
    /**
     * Connect to the WebSocket
     */
    async connect() {
        await this.makeConnection();
    }
    /**
     * Get a connection to the WebSocket
     */
    makeConnection() {
        if (this.connection) {
            return this.connection;
        }
        this.connection = new Promise((resolve, reject) => {
            const socket = new Socket(this.url, {
                ...this.connectionOptions,
                transports: ['websocket'],
            });
            socket.on('open', () => {
                resolve(socket);
            });
            socket.on('close', () => {
                this.connection = undefined;
            });
            socket.on('error', error => {
                reject(error);
            });
        });
        return this.connection;
    }
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
    getDefaultFormatter() {
        return new JsonFormatter();
    }
    /**
     * @inheritdoc
     */
    async handle(record) {
        if (!this.isHandling(record.level)) {
            return;
        }
        const connection = await this.makeConnection();
        connection.send(this.formatter.format(record));
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
        const formatter = this.formatter;
        for (const record of records) {
            connection.send(formatter.format(record));
        }
    }
}
