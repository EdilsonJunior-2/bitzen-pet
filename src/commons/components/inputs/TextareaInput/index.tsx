import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import "./styles.scss";

export default (props: TextArea) => {
    const { TextArea } = Input;

    return (
        <div className="textarea-component">
            <label>{props.label}</label>
            <TextArea status={props.errorMessage ? "error" : ""} {...props} />
            <span className="error-message">{props.errorMessage || ""}</span>
        </div>
    );
};

interface TextArea extends TextAreaProps {
    label: string;
    errorMessage?: boolean | string;
}
