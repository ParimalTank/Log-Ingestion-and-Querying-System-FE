import { api } from "@/lib/api";
import { LogEntry } from "@/types/log";

// Define the query filter type (can be adjusted based on actual backend schema)
interface LogFilters {
    message?: string;
    level?: string;
    resourceId?: string;
    timestamp_start?: string;
    timestamp_end?: string;
}

// GET logs with filters
export const getLogs = async (filters: LogFilters): Promise<unknown[]> => {
    const query = new URLSearchParams(filters as Record<string, string>).toString();
    const response = await api.get<unknown[]>(`/logs?${query}`);
    return response;
};

// POST a new log entry
export const createLog = async (log: Omit<LogEntry, "timestamp">): Promise<LogEntry> => {
    const newLog = { ...log, timestamp: new Date().toISOString(), metadata: {} };
    return await api.post<LogEntry>("/logs", newLog);
};
