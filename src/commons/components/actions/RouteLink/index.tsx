import clsx from "clsx";
import { ReactNode } from "react";
import "./styles.scss";

export default ((props: RouteLinkProps) => {
    return <a href={props.to} className={clsx(window.location.pathname === props.to && "active", "route-link")}>{props.children}</a>
});

interface RouteLinkProps {
    to: string;
    children: ReactNode
}