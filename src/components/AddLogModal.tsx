import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { api } from "@/lib/api";
import { LevelSelect } from "./LevelSelect";
import Bowser from "bowser";

interface AddLogModalProps {
    open: boolean;
    onClose: () => void;
    onLogAdded: () => void;
}

export const AddLogModal = ({ open, onClose, onLogAdded }: AddLogModalProps) => {
    const [form, setForm] = useState({
        level: "",
        message: "",
        resourceId: "",
        traceId: "",
        spanId: "",
        commit: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };


    const handleSubmit = async () => {
        if (
            !form.level ||
            !form.message ||
            !form.resourceId ||
            !form.traceId ||
            !form.spanId ||
            !form.commit
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const browserInfo = Bowser.getParser(window.navigator.userAgent);
        const userAgent = navigator.userAgent;
        const browser = browserInfo.getBrowserName();
        const os = browserInfo.getOSName();

        // Get public IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        const ipAddress = ipData.ip;

        const newLog = {
            ...form,
            metadata: {
                userAgent,
                browser,
                os,
                ipAddress,
            },
            timestamp: new Date().toISOString(),
        };

        try {
            await api.post("/logs", newLog);
            onLogAdded();
            onClose();
            setForm({
                level: "",
                message: "",
                resourceId: "",
                traceId: "",
                spanId: "",
                commit: "",
            });
        } catch (error) {
            console.error("Error posting log:", error);
            alert("Failed to add log.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Log Entry</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12 }}>
                        <LevelSelect
                            value={form.level}
                            onChange={(value) => handleChange("level", value)}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label="Resource ID"
                            fullWidth
                            value={form.resourceId}
                            onChange={(e) => handleChange("resourceId", e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label="Trace ID"
                            fullWidth
                            value={form.traceId}
                            onChange={(e) => handleChange("traceId", e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label="Span ID"
                            fullWidth
                            value={form.spanId}
                            onChange={(e) => handleChange("spanId", e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            label="Commit"
                            fullWidth
                            value={form.commit}
                            onChange={(e) => handleChange("commit", e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="message"
                            fullWidth
                            value={form.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
