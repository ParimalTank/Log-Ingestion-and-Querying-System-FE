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
    required?: boolean;
}

export const LevelSelect = ({ value, onChange, required }: LevelSelectProps) => (
    <FormControl fullWidth>
        <InputLabel>Level</InputLabel>
        <Select
            value={value}
            label="Level"
            onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
            required={required ? true : false}
        >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="error">❌ Error</MenuItem>
            <MenuItem value="warn">⚠️ Warn</MenuItem>
            <MenuItem value="info">ℹ️ Info</MenuItem>
        </Select>
    </FormControl>
);
