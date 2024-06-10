import api from ".";

const tokenKey = "token";

const sessionType = () => {
	if (window.localStorage.getItem("rememberMe") === "true")
		return window.localStorage;
	return window.sessionStorage;
}

const isAuthenticated = (): string | null => sessionType().getItem(tokenKey);

const login = async ({
	email,
	password,
	rememberMe,
}: any): Promise<boolean | string> =>
	await api
		.post("/login", {
			email,
			password,
		})
		.then((res) => {
			window.localStorage.setItem("rememberMe", rememberMe);
			sessionType().setItem("user", res.data.data.user.name);
			sessionType().setItem(tokenKey, res.data.data.token);
			return true;
		})
		.catch((err) => {
			return err.response && err.response.data ? err.response.data.data : false;
		});


const signUp = (form: any): Promise<any> =>
	api
		.post("/register", form)
		.then(() => {
			return true;
		})
		.catch((err) => {
			return err.response.data.data;
		});

const logout = (): void => {
	sessionType().clear();
	window.location.reload();
}

export { login, signUp, isAuthenticated, sessionType, logout }