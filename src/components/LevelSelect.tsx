import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";

interface LevelSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const LevelSelect = ({ value, onChange }: LevelSelectProps) => (
    <FormControl fullWidth>
        <InputLabel>Level</InputLabel>
        <Select
            value={value}
            label="Level"
            onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="error">❌ Error</MenuItem>
            <MenuItem value="warn">⚠️ Warn</MenuItem>
            <MenuItem value="info">ℹ️ Info</MenuItem>
        </Select>
    </FormControl>
);
