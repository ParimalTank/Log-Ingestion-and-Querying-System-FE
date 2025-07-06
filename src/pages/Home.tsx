import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    CircularProgress,
    Pagination, // Import Grid from the main package
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { LogEntry } from "@/types/log";
import { SearchInput } from "@/components/SearchInput";
import { DateInput } from "@/components/DateInput";
import { LevelSelect } from "@/components/LevelSelect";
import { AddLogModal } from "@/components/AddLogModal";
import { Plus } from 'lucide-react';
import { getLogs } from "@/services/logs";
import { LogTable } from "@/components/LogTable";
import LogLevelChart from "@/components/LogLevelChart";

type LogQuery = {
    message: string;
    level: string;
    resourceId: string;
    timestamp_start: string;
    timestamp_end: string;
    page: number;
    limit: number;
    total?: number;
};

export const Home = () => {

    // state to hold log entries
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // modal state for adding new logs
    const [openAddModal, setOpenAddModal] = useState(false);

    // query state for filtering logs
    const [query, setQuery] = useState<LogQuery>({
        message: "",
        level: "",
        resourceId: "",
        timestamp_start: "",
        timestamp_end: "",
        page: 1,
        limit: 10,
    });

    // input filter values
    const [message, setMessage] = useState("");
    const [level, setLevel] = useState("");
    const [resourceId, setResourceId] = useState("");

    // date filters
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    // loading state for fetching logs
    const [loading, setLoading] = useState(false);

    // pagination state
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    type GetLogsResponse = {
        logs: LogEntry[];
        total: number;
    };

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await getLogs(query) as unknown as GetLogsResponse; // API call with query params
            console.log('response: ', response);
            setLogs(response.logs); // response.logs is LogEntry[]
            setTotalCount(response.total);
        } catch (err) {
            console.error("Error fetching logs:", err);
            setLogs([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyFilters = () => {
        setLoading(true);
        setPage(1);
        const newQuery = {
            message,
            level,
            resourceId,
            timestamp_start: startDate ? startDate.toISOString() : "",
            timestamp_end: endDate ? endDate.toISOString() : "",
            page: 1,
            limit: pageSize,
        };
        setQuery(newQuery);
        fetchLogs();
        setLoading(false);
    };

    const handleClearFilters = () => {
        setMessage("");
        setLevel("");
        setResourceId("");
        setStartDate(null);
        setEndDate(null);
        const emptyQuery = {
            message: "",
            level: "",
            resourceId: "",
            timestamp_start: "",
            timestamp_end: "",
            page: 1,
            limit: pageSize,
        };
        setQuery(emptyQuery);
        // fetchLogs(emptyQuery);
    };

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
        setQuery((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    useEffect(() => {
        const debounceFetch = setTimeout(fetchLogs, 300); // debounce
        return () => clearTimeout(debounceFetch);
    }, [query]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                    🔍 Log Viewer Dashboard
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
                    <Button
                        variant="contained"
                        sx={{ mb: 3 }}
                        onClick={() => setOpenAddModal(true)}
                    >
                        <Plus /> Add Log
                    </Button>
                </Box>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SearchInput
                            label="Search message"
                            value={message}
                            onChange={setMessage}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SearchInput
                            label="Resource ID"
                            value={resourceId}
                            onChange={setResourceId}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, sm: 3 }}>
                        <DateInput label="Start Date/Time" value={startDate} onChange={setStartDate} />
                    </Grid>

                    <Grid size={{ xs: 6, sm: 3 }}>
                        <DateInput label="End Date/Time" value={endDate} onChange={setEndDate} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <LevelSelect
                            value={level}
                            onChange={setLevel}
                        />
                    </Grid>

                </Grid>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </Box>

                {loading ? (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                ) :
                    <>
                        <LogTable logs={logs} />
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={Math.ceil(totalCount / pageSize)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                        <Box sx={{ my: 4 }}>
                            <LogLevelChart logs={logs} />
                        </Box>
                    </>
                }

                <AddLogModal
                    open={openAddModal}
                    onClose={() => setOpenAddModal(false)}
                    onLogAdded={() => {
                        // refetch logs or update state if needed
                        setQuery((prev) => ({ ...prev }));
                    }}
                />
            </Container>
        </LocalizationProvider>
    );
};