import { RouteLink } from "@components/actions";
import "./styles.scss";
import { sessionType } from "@api/auth";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

export default (() => {
    const user = (sessionType().getItem("user") as string).split(" ");
    const navigate = useNavigate();
    return <header>
        <section className="top-header">
            <div>
                <img src="src/assets/bitzen-pet-logo.svg" />
                <RouteLink to="/home">Início</RouteLink>
            </div>
            <Avatar onClick={() => navigate("/usuario")} className="avatar">{user[0][0]}{user.length > 1 ? user[1][0] : ""}</Avatar>
        </section>
    </header>
})