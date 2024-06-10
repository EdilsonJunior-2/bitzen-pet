import React, { useState } from "react";
import { Checkbox, TextInput } from "@components/inputs";
import { Button, Link } from "@components/actions";
import { Box } from "@components/layout";
import { signUp } from "@api/auth";
import { ButtonTypes, ButtonVariants } from "@enums/Button";
import { SignUpFormEnum } from "@enums/SignUpForm";
import { changeFormField } from "@utils/form";
import "./styles.scss";
import { SignUpErrorMessages } from "@interfaces/errorMessages";

export default () => {

	const [loading, setLoading] = useState<boolean>(false);
	const [signUpForm, setSignUpForm] = useState({
		name: "",
		email: "",
		document: "",
		phone_number: "",
		password: "",
		password_confirmation: "",
		allowTerms: false,
	});

	const [errorMessages, setErrorMessages] = useState<SignUpErrorMessages>({
		name: false,
		email: false,
		document: false,
		password: false,
		phone_number: false
	});

	async function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		await signUp(signUpForm).then((res: any) => {
			setErrorMessages(Object.keys(errorMessages).reduce((acc: SignUpErrorMessages, key) => ({ ...acc, [key]: res[key] ? res[key].join(' ') : false }), {}))
			setLoading(false);
		});
	}

	return (
		<div className="sign-up-view">
			<Box>
				<Link href="/"><p className="go-back"><img src="src/assets/back-arrow.svg" />Voltar</p></Link>
				<h1>Cadastre-se</h1>
				<p>
					Já possui uma conta? <Link href="/">Entrar na plataforma</Link>
				</p>
				<form onSubmit={submit}>
					<TextInput name="name" label="Nome" placeholder="Seu nome"
						value={signUpForm.name}
						onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.name, setSignUpForm)}
						errorMessage={errorMessages.name}
					/>
					<TextInput
						name="email"
						label="E-mail"
						placeholder="Insira o seu e-mail"
						value={signUpForm.email}
						onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.email, setSignUpForm)}
						errorMessage={errorMessages.email}
					/>
					<div className="sign-up-form-line">
						<TextInput name="document" label="CPF"
							type="number"
							placeholder="Insira o seu CPF"
							value={signUpForm.document}
							onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.document, setSignUpForm)}
							errorMessage={errorMessages.document}
						/>
						<TextInput
							name="phone_number"
							type="number"
							label="Telefone"
							placeholder="Insira o seu telefone"
							value={signUpForm.phone_number}
							onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.phone_number, setSignUpForm)}
							errorMessage={errorMessages.phone_number}
						/>
					</div>
					<div className="sign-up-form-line">
						<TextInput
							name="password"
							type="password"
							label="Senha"
							placeholder="Crie uma senha"
							value={signUpForm.password}
							onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.password, setSignUpForm)}
							errorMessage={errorMessages.password}
						/>
						<TextInput
							name="password_confirmation"
							type="password"
							label="Confirmar senha"
							placeholder="Repita a senha"
							value={signUpForm.password_confirmation}
							onChange={(e) => changeFormField(e.target.value, SignUpFormEnum.password_confirmation, setSignUpForm)}
						/>
					</div>
					<Checkbox
						name="allowTerms"
						checked={signUpForm.allowTerms}
						onChange={(e) => changeFormField(e.target.checked, SignUpFormEnum.allowTerms, setSignUpForm)}
					>
						Li e concordo com os{" "}
						<Link href="/" target="_blank" thin>
							Termos de uso
						</Link>{" "}
						e a{" "}
						<Link href="/" target="_blank" thin>
							Política de privacidade
						</Link>{" "}
						do sistema.
					</Checkbox>
					<Button
						type={ButtonTypes.Submit}
						variant={ButtonVariants.Primary}
						full
						disabled={!signUpForm.allowTerms}
						loading={loading}
					>
						Criar conta
					</Button>
				</form>
			</Box>
		</div>
	);
};
