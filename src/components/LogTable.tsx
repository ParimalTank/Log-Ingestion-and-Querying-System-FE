import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Chip,
    Box,
} from "@mui/material";
import { LogEntry } from "@/types/log";

interface LogTableProps {
    logs: LogEntry[];
}

const getLevelColor = (level: string) => {
    switch (level) {
        case "error":
            return "error";
        case "warn":
            return "warning";
        case "info":
            return "info";
        default:
            return "default";
    }
};

export const LogTable = ({ logs }: LogTableProps) => {
    if (logs.length === 0) {
        return (
            <Typography variant="body2" align="center" color="text.secondary">
                🚫 No logs found.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell>Level</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Resource ID</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Trace ID</TableCell>
                        <TableCell>Span ID</TableCell>
                        <TableCell>Commit</TableCell>
                        <TableCell>Metadata</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log, idx) => (
                        <TableRow key={idx} hover>
                            <TableCell>
                                <Chip
                                    label={log.level.toUpperCase()}
                                    color={getLevelColor(log.level)}
                                    size="small"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell sx={{ maxWidth: 300, wordWrap: "break-word" }}>
                                {log.message}
                            </TableCell>
                            <TableCell>{log.resourceId}</TableCell>
                            <TableCell>
                                {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>{log.traceId}</TableCell>
                            <TableCell>{log.spanId}</TableCell>
                            <TableCell>{log.commit}</TableCell>
                            <TableCell>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>User Agent:</b>
                                        {(log.metadata && typeof log.metadata.userAgent === "string")
                                            ? log.metadata.userAgent.split(" (")[0]
                                            : "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>IP Address:</b> {(log.metadata && typeof log.metadata.ipAddress === "string") ? log.metadata.ipAddress : "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>OS:</b> {typeof log.metadata?.os === "string" ? log.metadata.os : "N/A"}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
