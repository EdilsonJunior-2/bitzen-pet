import clsx from "clsx";
import "./styles.scss";


export default ((props: InputProps) => {

	return <div className="input-component">
		<label className="label">{props.label || ""}</label>
		<input className={clsx(props.errorMessage && "error")} name={props.name} value={props.value} type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
		<span className="error-message">{props.errorMessage || ""}</span>
	</div>
})

interface InputProps {
	label?: string;
	name: string;
	value?: string | number;
	onChange?: (event: any, ...props: any) => any;
	error?: boolean;
	errorMessage?: string | boolean;
	type?: string;
	placeholder?: string;
}