class Pet {
    id?: number;
    name: string;
    image: File | string | null;
    color: string;
    birthdate: string;
    description?: string;
    image_url?: string;
    age?: string;
    observation?: string;

    constructor(props?: { name?: string, color?: string, birthdate?: string, description?: string, image?: File }) {
        this.name = props?.name || "";
        this.image = props?.image || null;
        this.color = props?.color || "";
        this.birthdate = props?.birthdate || "";
        this.description = props?.description || undefined;
    }
}

export default Pet;