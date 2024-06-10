import { ReactNode } from "react";
import "./styles.scss";

export default ((props: CheckboxProps) => {
    return <div className="checkbox-component">
        <input type="checkbox" name={props.name} id={props.name} checked={props.checked} onChange={props.onChange} />
        <label htmlFor={props.name}><p>{props.children}</p></label>
    </div>
});

interface CheckboxProps {
    name: string;
    children: ReactNode;
    checked?: boolean;
    onChange?: (e: any, ...props: any) => any;
}
