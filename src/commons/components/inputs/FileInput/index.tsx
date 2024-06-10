import { ReactNode } from "react";
import "./styles.scss";

export default ((props: FileInputProps) => {
	const onChange = (e: any) => {
		/*
		const file = e[0];
		const reader = new FileReader();
		reader.onload = () => {
			reader.result;
		}

		reader.readAsText(file);
		console.log(reader.readAsText(file))*/
		console.log(e)
	}
	return (
		<div className="file-input-component">
			<input
				accept={props.accept}
				type="file"
				name={props.name}
				id={props.name}
				onChange={e => props.change(e)}
			/>
			<label htmlFor={props.name}>{props.children}</label>
			<span className="error-message">{props.errorMessage || ""}</span>
		</div>
	);
});

interface FileInputProps {
	name: string;
	children: ReactNode;
	change: (e: any) => any;
	accept: string;
	errorMessage?: string | boolean;
}
/*

import { useEffect, useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import "./styles.scss";
import { UploadChangeParam } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default (props: FileInputProps) => {
	const [preview, setPreview] = useState<string>();
	const [file, setFile] = useState<any>();

	useEffect(() => {

	}, [preview]);

	const beforeChange = async (file: any) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			props.change(e.target?.result);
		};
		console
		return true;
	};
	const onChange = async (event: UploadChangeParam<UploadFile>) => {
		console.log(event.file)

		if (event.file.status !== 'uploading') {
			let reader = new FileReader();
			reader.onload = (e) => {
				var contents = e.target?.result;
			}
			reader.readAsText(event.file as Blob);
		}
		let src = event.file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(event.file.originFileObj as FileType);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		console.log(src);
		setPreview(src);
	};
	return (
		<div className="file-input-component">
			<Upload
				id={props.name}
				onChange={(e) => onChange(e)}
				showUploadList={false}
				accept="image/jpeg, image/png, image/png"
			>
				<img
					className="pet-image"
					src={preview || "src/assets/add-pet-placeholder.svg"}
				/>
			</Upload>
			<span className="error-message">{props.errorMessage || ""}</span>
		</div>
	);
};

interface FileInputProps extends UploadProps {
	errorMessage: string | boolean;
	change: (e: any) => any;
}
*/