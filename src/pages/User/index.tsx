import { Box, PageHeader } from "@components/layout"
import "./styles.scss"
import { useEffect, useState } from "react"
import { getUser, updateUser } from "@api/user"
import { TextInput } from "@components/inputs"
import { changeFormField } from "@utils/form"
import { UserErrorMessages } from "@classes/errorMessages"
import { ButtonVariants } from "@enums/Button"
import { Button } from "@components/actions"
import { logout } from "@api/auth"

export default (() => {

    const [user, setUser] = useState<any>();
    const [errorMessages, setErrorMessages] = useState<UserErrorMessages>(new UserErrorMessages());
    const [loading, setLoading] = useState<boolean>(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);

    useEffect(() => {
        getUser().then(res => { console.log(res); setUser(res) });
    }, []);

    function saveUserData(e: any) {
        e.preventDefault();
        setLoading(true);
        updateUser(user).then(() => setLoading(false));
    }

    return <div className="user-page">
        <PageHeader>Meu Perfil</PageHeader>
        <div className="page-body">
            <Box title="Meus dados">
                <TextInput name="name" label="Nome" placeholder="Seu nome"
                    value={user?.name}
                    onChange={(e) => changeFormField(e.target.value, "name", setUser)}
                    errorMessage={errorMessages.name}
                />
                <TextInput
                    name="email"
                    label="E-mail"
                    placeholder="Insira o seu e-mail"
                    value={user?.email}
                    onChange={(e) => changeFormField(e.target.value, "email", setUser)}
                    errorMessage={errorMessages.email}
                />
                <div className="button">
                    <Button loading={loading} full onClick={saveUserData} variant={ButtonVariants.Primary}>Salvar</Button>                </div>
            </Box>
            <div className="password-box">
                <Box>
                    <h4>Senha</h4>
                    <Button thin variant={ButtonVariants.Primary} borderless onClick={() => setChangePasswordModal(true)}><p><img src="src/assets/edit.svg" />Alterar</p></Button>
                </Box>
            </div>
            <div className="logout">
                <Box>
                    <Button thin variant={ButtonVariants.Error} borderless onClick={logout}><p><img src="src/assets/logout.svg" />Sair da minha conta</p></Button>
                </Box>
            </div>
        </div>
    </div>
})