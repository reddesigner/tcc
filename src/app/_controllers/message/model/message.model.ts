export class Message {
    message: String;
    type: MessageType;
}

export enum MessageType {
    success,
    error,
    info,
    warning
}
