import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid, // Import Grid from the main package
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { LogEntry } from "@/types/log";
import { SearchInput } from "@/components/SearchInput";
import { DateInput } from "@/components/DateInput";
import { LevelSelect } from "@/components/LevelSelect";

export const Home = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [query, setQuery] = useState({
        message: "",
        level: "",
        resourceId: "",
        timestamp_start: "",
        timestamp_end: "",
    });

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        setQuery((prev) => ({
            ...prev,
            timestamp_start: startDate ? startDate.toISOString() : "",
            timestamp_end: endDate ? endDate.toISOString() : "",
        }));
    }, [startDate, endDate]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const dummyLogs: LogEntry[] = [
                {
                    level: "error",
                    message: "Database connection failed",
                    resourceId: "server-123",
                    timestamp: new Date().toISOString(),
                    traceId: "abc-001",
                    spanId: "span-001",
                    commit: "1a2b3c4",
                    metadata: {},
                },
                {
                    level: "info",
                    message: "User login successful",
                    resourceId: "auth-service",
                    timestamp: new Date().toISOString(),
                    traceId: "abc-002",
                    spanId: "span-002",
                    commit: "1a2b3c4",
                    metadata: {},
                },
                {
                    level: "warn",
                    message: "Low disk space on server-456",
                    resourceId: "server-456",
                    timestamp: new Date().toISOString(),
                    traceId: "abc-003",
                    spanId: "span-003",
                    commit: "1a2b3c4",
                    metadata: {},
                },
            ];
            setLogs(dummyLogs);
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                    🔍 Log Viewer Dashboard
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SearchInput
                            label="Search message"
                            value={query.message}
                            onChange={(value) => setQuery({ ...query, message: value })}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SearchInput
                            label="Resource ID"
                            value={query.resourceId}
                            onChange={(value) => setQuery({ ...query, resourceId: value })}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, sm: 3 }}>
                        <DateInput label="Start Date" value={startDate} onChange={setStartDate} />
                    </Grid>

                    <Grid size={{ xs: 6, sm: 3 }}>
                        <DateInput label="End Date" value={endDate} onChange={setEndDate} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <LevelSelect
                            value={query.level}
                            onChange={(value) => setQuery({ ...query, level: value })}
                        />
                    </Grid>

                </Grid>

                {logs.length === 0 ? (
                    <Typography variant="body2" align="center" color="text.secondary">
                        🚫 No logs found.
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {logs.map((log, index) => (
                            <Grid size={{ xs: 12 }} key={index}>
                                <Card
                                    sx={{
                                        borderLeft: `6px solid ${log.level === "error"
                                            ? "#f44336"
                                            : log.level === "warn"
                                                ? "#ff9800"
                                                : "#2196f3"
                                            }`,
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            [{log.level.toUpperCase()}] {log.message}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Resource: <strong>{log.resourceId}</strong>
                                            {" • "}
                                            {new Date(log.timestamp).toLocaleString()}
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
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </LocalizationProvider>
    );
};