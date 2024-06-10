function changeFormField(
	value: string | boolean,
	target: any,
	func: React.SetStateAction<(prevState: any) => void>
) {
	func((prev) => ({
		...prev,
		[target]: value,
	}));
}

function setFormErrorMessages(errorMessages: Object, errorResponse: any) {
	return Object.keys(errorMessages).reduce((acc: Object, key) => ({ ...acc, [key]: errorResponse[key] ? errorResponse[key].join(' ') : false }), {})
}

export { changeFormField, setFormErrorMessages };
