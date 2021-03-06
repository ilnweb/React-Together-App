import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storageFB } from '../../firebase/firebase.config';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

class UploadImage extends React.Component {
	state = {
		loading: false
  };
  
   dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.

			getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState(
					{
						imageUrl,
						loading: false
					},
					() => {
						const id = () => {
							return '_' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9);
						};
						const imageID = id();

						const uploadTask = storageFB.ref(`/connectionimages/${imageID}`).put(info.file.originFileObj);
						uploadTask.on(
							'state_changed',
							(snapShot) => {
								//takes a snap shot of the process as it is happening
								console.log(snapShot);
							},
							(err) => {
								//catches the errors
								console.log(err);
							},
							() => {
								// gets the functions from storage refences the image storage in firebase by the children
								// gets the download url then sets the image from firebase as the value for the imgUrl key:
								storageFB.ref('connectionimages').child(imageID).getDownloadURL().then((fireBaseUrl) => {
									this.props.handleImage(fireBaseUrl);
								});
							}
						);
					}
				)
			);
		}
	};

	render() {
		const uploadButton = (
			<div>
				{this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl } = this.state;
		return (
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				customRequest={this.dummyRequest}
				beforeUpload={beforeUpload}
        onChange={this.handleChange}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		);
	}
}

export default UploadImage;