import api from "."

const getUser = async () => {
    return await api.get("/user").then(res => res.data.data);
}

const updateUser = async (user: { name: string, email: string }) => {
    return await api.put("/user", user).then(() => true).catch(err => console.log(err));
}

export { getUser, updateUser }