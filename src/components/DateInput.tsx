import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

interface DateInputProps {
    label: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
}

export const DateInput = ({ label, value, onChange }: DateInputProps) => (
    <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{ textField: { fullWidth: true } }}
    />
);
