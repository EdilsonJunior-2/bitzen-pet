class PetFormErrorMessages {
    image: string | false;
    name: string | false;
    color: string | false;
    birthdate: string | false;
    description: string | false;

    constructor() {
        this.image = false;
        this.name = false;
        this.color = false;
        this.birthdate = false;
        this.description = false;
    }
}

class UserErrorMessages {
    name: string | false;
    email: string | false;

    constructor() {
        this.name = false;
        this.email = false;
    }
}

export { PetFormErrorMessages, UserErrorMessages }