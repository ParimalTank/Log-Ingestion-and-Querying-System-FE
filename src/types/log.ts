export interface LogEntry {
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    metadata: Record<string, unknown>;
}
