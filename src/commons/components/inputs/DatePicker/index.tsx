import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import "./styles.scss";
import clsx from "clsx";

export default ((props: DateProps) => {
    return <div className="date-picker-component">
        <label>{props.label}</label>
        <DatePicker placeholder={props.placeholder} className={clsx(props.errorMessage && "error", "date-picker")} defaultValue={props.initialValue ? dayjs(props.initialValue, "YYYY-MM-DD") : null} {...props} />
        <span className="error-message">{props.errorMessage || ""}</span>
    </div>

})

interface DateProps extends DatePickerProps {
    label: string;
    initialValue: string;
    errorMessage?: string | boolean;
}