import { ReactNode } from "react";
import "./styles.scss";
import clsx from "clsx";

export default ((props: LinkProps) =>
    <a className={clsx("link-component", props.thin && "thin")} href={props.href} target={props.target}>{props.children}</a>
);

interface LinkProps {
    children: ReactNode;
    href: string;
    target?: string;
    thin?: boolean;
}