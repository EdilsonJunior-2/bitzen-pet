import { Button, Link } from "@components/actions"
import { Box, PageHeader } from "@components/layout"
import { ButtonVariants } from "@enums/Button"
import "./styles.scss"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPet } from "@api/pet"
import Pet from "@classes/pet"

export default (() => {
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet>(new Pet());

    useEffect(() => {
        const paths = window.location.pathname.split("/");
        const petId = paths[paths.length - 1];
        getPet(petId).then(res => setPet(res));
    }, []);

    return <div className="show-pet-view">
        <PageHeader>Detalhes</PageHeader>
        <section className="page-body">
            <section className="general-actions">
                <Link href="/home"><p className="go-back"><img src="src/assets/back-arrow.svg" />Voltar</p></Link>
                <Button variant={ButtonVariants.Primary} thin onClick={() => navigate(`/editar-pet/${pet.id}`)}>
                    <p className="edit-pet-button"><img src="src/assets/edit.svg" />Editar</p>
                </Button>
            </section>
            <section className="pet-info">
                <div className="pet-image">
                    <img src={pet.image_url} alt={pet.name} />
                </div>
                <Box>
                    <div className="pet-text-info-1">
                        <div>
                            <h4>Nome</h4>
                            <p>{pet.name}</p>
                        </div>
                        <div>
                            <h4>Cor</h4>
                            <p>{pet.color}</p>
                        </div>
                        <div>
                            <h4>Idade</h4>
                            <p>{pet.age}</p>
                        </div>
                    </div>
                    <div>
                        <h4>
                            Sobre o pet
                        </h4>
                        <p>
                            {pet.description}
                        </p>
                    </div>
                </Box>
            </section>
        </section>
    </div>
})