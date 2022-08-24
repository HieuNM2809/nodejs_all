import { Col, Image, message, Progress, Row, Upload } from 'antd';
// import { imageUrl } from '../../constants/ApiUrl';
// import { arrayToString } from '../../util/handleImage';
import { CloseOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import { UploadWrapper } from './UploadAttachment.style';
import { checkImage, toMediaArr } from '../../../utils/image_utils';

const UploadAttachment = ({ onImageChange, maxCount, data }) => {
  const [preview, setPreview] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);
  const defaultFileList = data || [];
  for (let i = 0; i < defaultFileList.length; i++) {
    defaultFileList[i] = {
      uid: `${i + 1}`,
      name: defaultFileList[i].public_id,
      status: 'done',
      type: (defaultFileList[i].url.match('/image/') ? 'image/' : 'video') + defaultFileList[i].url.substring(defaultFileList[i].url.lastIndexOf('.') + 1),
      response: {
        public_id: defaultFileList[i].public_id,
        url: defaultFileList[i].url
      },
      url: defaultFileList[i].url,
    };
  }


  const [fileList, setFileList] = useState(defaultFileList);
  const onChange = ({ fileList: newFileList, file }) => {
    if (newFileList.length === 0) {
      onImageChange(null);
      setFileList(newFileList);
    } else {
      setFileList(newFileList);

      if (file?.status === 'done') {
        const final = toMediaArr(newFileList);
        onImageChange(final);
      }
      if (file?.status === 'removed') {
        const final = toMediaArr(newFileList);
        onImageChange(final);
      }

    }
  };

  const uploadImage = async options => {
    const { action, onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };



    fmData.append('upload_preset', 'ijubicjh');
    fmData.append('cloud_name', 'quankiu');
    fmData.append('file', file);

    try {
      const res = await axios.post(
        action,
        fmData,
        config
      );
      onSuccess(res.data);
    } catch (err) {
      onError({ err });
    }
  };

  return (
    <>
      {preview && (
        <Image
          style={{ display: 'none' }}
          src={preview}
          preview={{ visible: !!preview, onVisibleChange: () => setPreview('') }}
        />
      )}
      {videoPreview && (
        <div className="video-preview-modal scale-up-center"
        >
          <div className="mark">
            <CloseOutlined onClick={() => setVideoPreview('')} />
          </div>
          <video
            autoPlay
            controls
          >
            <source
              src={videoPreview}
              type="video/mp4"
            />
          </video>

        </div>
      )}
      <UploadWrapper
        action="https://api.cloudinary.com/v1_1/quankiu/upload"
        listType="picture-card"
        beforeUpload={(file) => {
          const error = checkImage(file);
          if (error) {
            message.error(error)
          }

          return !error || Upload.LIST_IGNORE;
        }}
        customRequest={uploadImage}
        itemRender={(props, file, files, actions) => {
          return <div className="media-preview">
            {file.type.match('image.*') && <img src={file?.response?.url} />}
            {file.type.match('video.*') && file?.response?.url && <video width="100%" height="100%" >
              <source src={file?.response?.url} type="video/mp4" />
            </video>}
            <div className="mark">
              <Row gutter={12}>
                <Col><EyeOutlined onClick={() => {
                  file.type.match('image.*') ? setPreview(file?.response?.url) : setVideoPreview(file?.response?.url)
                }} /></Col>
                <Col><DeleteOutlined onClick={actions.remove} /></Col>
              </Row>
            </div>
            {file?.percent && <Progress type="circle" status={file.status === "error" ? "exception" : file.status === "done" ? "success" : "active"} width={60} percent={file?.percent?.toFixed(2)} />}
          </div>
        }}
        fileList={fileList}
        onChange={onChange}
        maxCount={maxCount}
      >
        {fileList.length < maxCount && '+ Upload'}

      </UploadWrapper>

    </>
  );
};

export default UploadAttachment;
