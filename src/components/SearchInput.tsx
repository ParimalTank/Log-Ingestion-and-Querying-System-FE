import { TextField } from "@mui/material";

interface SearchInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ label, value, onChange }: SearchInputProps) => (
    <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);
