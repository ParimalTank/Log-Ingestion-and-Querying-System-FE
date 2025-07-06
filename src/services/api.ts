import { LogEntry } from '@/types/log';

const BASE_URL = 'http://localhost:3000'; // Update if needed

export const fetchLogs = async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/logs?${query}`);
    if (!res.ok) throw new Error('Failed to fetch logs');
    return res.json() as Promise<LogEntry[]>;
};
