import { ReactNode } from "react";
import "./styles.scss";
export default ((props: PageHeaderProps) => {
    return <section className="page-header"><h2>{props.children}</h2></section>
})

interface PageHeaderProps {
    children: ReactNode
}