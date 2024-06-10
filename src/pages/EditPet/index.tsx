import {
	DatePicker,
	FileInput,
	TextAreaInput,
	TextInput,
} from "@components/inputs";
import { Box, PageHeader } from "@components/layout";
import { changeFormField, setFormErrorMessages } from "@utils/form";
import { useEffect, useState } from "react";
import Pet from "@classes/pet";
import "./styles.scss";
import { Button } from "@components/actions";
import { ButtonTypes, ButtonVariants } from "@enums/Button";
import { createPet, getPet, updatePet } from "@api/pet";
import { PetFormErrorMessages } from "@classes/errorMessages";
import { useNavigate } from "react-router-dom";

export default () => {
	const [petDataForm, setPetDataForm] = useState<Pet>(new Pet());
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState(new PetFormErrorMessages());
	const navigate = useNavigate();

	useEffect(() => {
		const path = window.location.pathname.split("/");
		if (path.length === 3) {
			getPet(path[2]).then((res: Pet) => setPetDataForm({
				image_url: res.image_url,
				name: res.name,
				description: res.observation,
				color: res.color,
				birthdate: res.age as string,
				image: null
			}));
		} else
			setPetDataForm(new Pet());
	}, []);

	async function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		console.log(petDataForm)
		const path = window.location.pathname.split("/");
		if (path.length === 3) {
			await updatePet(petDataForm, path[2]).then((res: any) => {
				if (res === true)
					navigate("/home");
				else {
					setErrorMessages(setFormErrorMessages(errorMessages, res) as PetFormErrorMessages);
					setLoading(false);
				}
			})
		} else
			await createPet(petDataForm).then((res: any) => {
				if (res === true)
					setErrorMessages(setFormErrorMessages(errorMessages, res) as PetFormErrorMessages);
				else {
					setLoading(false);
					navigate("/home");
				}
			});
	}

	return (
		<div className="edit-pet-view">
			<PageHeader>Novo pet</PageHeader>
			<form className="page-body" onSubmit={submit}>
				<FileInput
					name="pet-form-image"
					accept="image/*"
					change={(e: any) => changeFormField(e.target.files[0], "image", setPetDataForm)}
					errorMessage={errorMessages.image}
				>
					<img
						className="pet-image"
						src={petDataForm.image ? URL.createObjectURL(petDataForm.image as File) : petDataForm.image_url || "src/assets/add-pet-placeholder.svg"}
					/>
				</FileInput>
				<div>
					<Box>
						<div className="form-fields">
							<TextInput
								name="pet-name"
								label="Nome"
								placeholder="Nome do pet"
								errorMessage={errorMessages.name}
								value={petDataForm.name}
								onChange={(e) =>
									changeFormField(e.target.value, "name", setPetDataForm)
								}
							/>
							<TextInput
								name="pet-color"
								label="Cor"
								placeholder="Cor do pet"
								errorMessage={errorMessages.color}
								value={petDataForm.color}
								onChange={(e) =>
									changeFormField(e.target.value, "color", setPetDataForm)
								}
							/>
							<DatePicker
								label="Data de nascimento"
								placeholder="Selecione"
								initialValue={petDataForm.birthdate}
								errorMessage={errorMessages.birthdate}
								onChange={(_, dateString): void =>
									changeFormField(
										dateString as string,
										"birthdate",
										setPetDataForm
									)
								}
							/>
							<TextAreaInput
								label="Sobre o pet"
								placeholder="Escreva um pequeno texto sobre o pet"
								errorMessage={errorMessages.description}
								value={petDataForm.description}
								onChange={(e) => changeFormField(e.target.value, "description", setPetDataForm)}
								rows={4}
							/>
						</div>
					</Box>
					<Button
						type={ButtonTypes.Submit}
						variant={ButtonVariants.Primary}
						loading={loading}
						full
					>
						Salvar
					</Button>
				</div>
			</form>
		</div>
	);
};
