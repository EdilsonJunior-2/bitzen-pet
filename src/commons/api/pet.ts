import Pet from "@classes/pet";
import api from ".";

const createPet = async (pet: Pet): Promise<any> => {
	return await api
		.post("/pets", pet, {
			headers: {
				"Content-Type": "multipart/form-data",
			}, data: pet
		})
		.then(() => true)
		.catch((err) => err.response.data.data);
}

const getPets = async (searchString?: string): Promise<Pet[] | any> => {
	return await api.get(`/pets${searchString ? `?search=${searchString}` : ""}`).then((res) => res).catch((err) => err);
}

const getPet = async (id: string): Promise<Pet | any> => {
	return await api.get(`/pets/${id}`).then(res => res.data.data).catch(err => err);
}

const updatePet = async (pet: Pet, petId: string): Promise<any> => {
	return await api
		.put(`/pets/${petId}`, pet, {
			headers: {
				"Content-Type": "multipart/form-data",
			}, data: pet
		})
		.then(() => true)
		.catch((err) => err.response.data.data);
}

const deletePet = async (petId: number) => {
	return await api.delete(`/pets/${petId}`).then(() => true).catch(() => false);
}

export { createPet, getPets, getPet, updatePet, deletePet }