import { Card, CardContent, Typography } from "@mui/material";
import { LogEntry } from "@/types/log";

interface LogCardProps {
    log: LogEntry;
}

export const LogCard = ({ log }: LogCardProps) => {
    const color =
        log.level === "error" ? "#f44336" :
            log.level === "warn" ? "#ff9800" :
                "#2196f3";

    return (
        <Card sx={{ borderLeft: `6px solid ${color}` }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    [{log.level.toUpperCase()}] {log.message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Resource: <strong>{log.resourceId}</strong> • {new Date(log.timestamp).toLocaleString()}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.disabled"
                    fontFamily="monospace"
                >
                    Trace: {log.traceId} • Commit: {log.commit}
                </Typography>
            </CardContent>
        </Card>
    );
};
