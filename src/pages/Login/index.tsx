import "./styles.scss";
import { TextInput, Checkbox } from "@components/inputs";
import { Link, Button } from "@components/actions";
import { Box } from "@components/layout";
import { ButtonVariants, ButtonTypes } from "@enums/Button";
import { LoginFormEnum } from "@enums/LoginForm";
import { login } from "@api/auth";
import { useState } from "react";
import { changeFormField } from "@utils/form";
import { useNavigate } from "react-router-dom";

export default () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	async function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		await login(loginForm).then((res) => {
			if (res === true)
				navigate("/home");
			setLoading(false)
		});
	}

	return (
		<div className="login-view">
			<Box>
				<img src="src/assets/bitzen-pet-logo.svg" alt="bitzen pet logo" />
				<h2>Entrar na plataforma</h2>
				<p>
					Não tem uma conta?{" "}
					<Link href="/cadastro">Cadastre-se gratuitamente</Link>
				</p>
				<form onSubmit={submit}>
					<TextInput
						name="email"
						label="Email"
						placeholder="Seu email"
						value={loginForm.email}
						onChange={(e) =>
							changeFormField(e.target.value, LoginFormEnum.email, setLoginForm)
						}
					/>
					<TextInput
						name="password"
						label="Senha"
						type="password"
						placeholder="Sua senha"
						value={loginForm.password}
						onChange={(e) =>
							changeFormField(
								e.target.value,
								LoginFormEnum.password,
								setLoginForm
							)
						}
					/>
					<div className="aditional-options">
						<Checkbox
							name="rememberMe"
							checked={loginForm.rememberMe}
							onChange={(e) =>
								changeFormField(
									e.target.checked,
									LoginFormEnum.rememberMe,
									setLoginForm
								)
							}
						>
							Manter conectado
						</Checkbox>
						<p>
							<Link href="/recover-password">Esqueceu sua senha?</Link>
						</p>
					</div>
					<Button
						type={ButtonTypes.Submit}
						variant={ButtonVariants.Primary}
						loading={loading}
						full
					>
						Entrar na plataforma
					</Button>
				</form>
			</Box>
		</div>
	);
};
