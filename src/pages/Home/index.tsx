import { Modal, Table, Input } from "antd";

import "./styles.scss";
import { Button } from "@components/actions";
import { ButtonVariants } from "@enums/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@components/layout";
import { deletePet, getPets } from "@api/pet";
import Pet from "@classes/pet";

export default () => {
	const { Column, ColumnGroup } = Table;
	const { Search } = Input;
	const navigate = useNavigate();

	const [selectedPet, setSelectedPet] = useState<Pet | false>(false);
	const [pets, setPets] = useState<Pet[]>([]);

	useEffect(() => {
		getPets().then(res => setPets(res.data.data.data));
	}, []);

	async function deletePetFunc() {
		await deletePet((selectedPet as Pet).id as number).then(() => {
			getPets().then(res => {
				setPets(res.data.data.data);
				setSelectedPet(false);
			});
		});
	}

	async function cancelDelete() {
		alert("Seu pet te ama, nunca o abandone :D");
		setSelectedPet(false);
	}

	function onSearch(value: string) {
		getPets(value).then(res => setPets(res.data.data.data));
	}

	return (
		<div className="home-view">
			<PageHeader>Seus Pets</PageHeader>
			<section className="page-body">
				<section className="general-actions">
					<Search
						placeholder="Pesquisar um pet"
						enterButton="Buscar"
						onSearch={onSearch}
					/>
					<div />
					<div />
					<Button variant={ButtonVariants.Primary} thin onClick={() => navigate("/novo-pet")}>
						<p className="add-pet-button">
							<img src="src/assets/plus.svg" />
							Cadastrar pet
						</p>
					</Button>
				</section>
				<Table dataSource={pets} className="table">
					<ColumnGroup
						className="table-title"
						title="Lista de pets"
						align="left"
					>
						<Column
							title="Pet"
							dataIndex="image_url"
							key="image_url"
							width={300}
							render={(image_url: string) => <img height={150} src={image_url} />}
						/>
						<Column title="Nome" dataIndex="name" key="name" />
						<Column title="Idade" dataIndex="age" key="age" />
						<Column title="Cor" dataIndex="color" key="color" />
						<Column
							width={200}
							title=""
							key="action"
							render={(_: any, record: any) => (
								<div className="table-actions">
									<Button variant={ButtonVariants.Neutral} outlined thin onClick={() => navigate(`/ver-pet/${record.id}`)}>
										<img src="src/assets/eye.svg" className="action-button" />
									</Button>
									<Button
										onClick={(e) => {
											e.preventDefault();
											setSelectedPet(record);
										}}
										variant={ButtonVariants.Neutral}
										outlined
										thin
									>
										<img src="src/assets/trash.svg" className="action-button" />
									</Button>
								</div>
							)}
						/>
					</ColumnGroup>
				</Table>
			</section>
			<Modal
				title={`Abandonar ${(selectedPet as Pet).name}`}
				open={!!selectedPet}
				onOk={deletePetFunc}
				onCancel={cancelDelete}
				okButtonProps={{ danger: true }}
			>
				<p>Você quer mesmo abandonar {(selectedPet as Pet).name}? :((</p>
			</Modal>
		</div>
	);
};
