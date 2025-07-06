import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface DateInputProps {
    label: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
}

export const DateInput = ({ label, value, onChange }: DateInputProps) => (
    <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{ textField: { fullWidth: true } }}
    />
);
