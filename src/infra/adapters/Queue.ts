export interface Queue {
    connect(): Promise<void>
    publish(messageName: string, data: any): Promise<void>
}
