import { ReactNode } from "react";
import "./styles.scss";
import clsx from "clsx";
export default ((props: BoxProps) => {
    return <div className={clsx("box-component", props.className, props.full && "full")}>
        {props.title && <h3>{props.title}</h3>}
        <div className="children">
            {props.children}
        </div>
    </div>
})

interface BoxProps {
    children: ReactNode;
    title?: string;
    className?: string;
    full?: boolean;
}