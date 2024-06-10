import clsx from "clsx";
import { ReactNode } from "react";
import { ButtonTypes, ButtonVariants } from "@enums/Button";
import "./styles.scss";

export default ((props: ButtonProps) => {
    return <button
        disabled={props.loading || props.disabled}
        onClick={props.onClick}
        type={props.type}
        className={clsx(props.variant, props.outlined && "outlined", props.borderless && "borderless", props.full && "full", props.thin && "thin")}>
        {props.children}
    </button>

});

interface ButtonProps {
    children: ReactNode;
    type?: ButtonTypes;
    onClick?: (clickProps: any) => any;
    variant: ButtonVariants;
    outlined?: boolean;
    borderless?: boolean;
    full?: boolean;
    loading?: boolean;
    disabled?: boolean;
    thin?: boolean;
}