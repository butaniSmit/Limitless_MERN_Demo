import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { GetChangeAvatarDetails } from "@/pages/api/axiosRequest";
import { useRouter } from "next/router";
import LoadingPage from "../common/loadingPage";

const ChangeAvatar = ({ reloadData }) => {
    const [files, setFiles] = useState([]);
    const [filedata, setFileData] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [selectfile, setSelectFile] = useState([]);
    const [filesize, setFileSize] = useState([]);
    const [loading, setLoading] = useState(false);
    const [profileimageError, setprofileimageError] = useState([]);
    const router = useRouter();
    const { getRootProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles, fileRejections) => {
            setprofileimageError(fileRejections.map((file) => file.errors[0].message))
            setIsActive(false)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                file: file,
                preview: URL.createObjectURL(file)
            })));
            setFileData(acceptedFiles.map(file => (file)));
            setSelectFile(acceptedFiles.map(file => (file.path)));
            setFileSize(acceptedFiles.map(file => (file.size.formatBytes())));
        }
    });
    Number.prototype.formatBytes = function () {
        var units = ['B', 'KB', 'MB', 'GB', 'TB'],
            bytes = this,
            i;
        for (i = 0; bytes >= 1024 && i < 4; i++) {
            bytes /= 1024;
        }
        return bytes.toFixed(2) + units[i];
    }
    const thumbs = files.map(file => (
        <>
            <img
                key={file.id}
                src={file.preview}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
                className="file-preview-image kv-preview-data"
                style={{
                    "width": "auto",
                    "height": "auto",
                    "maxWidth": "100%",
                    "maxHeight": "100%"
                }}
            />
        </>
    ));
    const handleRemove = (e) => {
        e.preventDefault();
        setIsActive(true);
        setSelectFile('');
        setprofileimageError('');
    }
    const handleCancel = () => {
        router.push("/");
        setprofileimageError('');
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            avatar: filedata[0]
        }
        try {
            setLoading(true)
            const resp = await GetChangeAvatarDetails(data);
            reloadData();
            handleCancel();
            toast.success(resp.data.message);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setprofileimageError(error?.response?.data?.message);
        }
    }
    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
    return (
        <>
            <div className="tab-pane fade active show" id="justified-right-icon-tab2">
                {loading ? <LoadingPage/>:null}
                <div className="card profilecard">
                    <div className="card-body">
                        <Form className="form-horizontal" onSubmit={handleSubmit}>
                            <Row className="row">
                                <Col className="col-lg-12 form-group">
                                    <label onClick={open} className="col-lg-2 col-form-label font-weight-semibold">Avatar</label>
                                    <div {...getRootProps()}>
                                        <div className="file-input">
                                            <div className="file-preview">
                                                {!isActive ?
                                                    <button onClick={handleRemove} type="button" className="btn-close fileinput-remove">
                                                    </button>
                                                    : null}
                                                <div className=" file-drop-zone">
                                                    {isActive ?
                                                        <div className="file-drop-zone-title">Drag &amp; drop files here …</div>
                                                        :
                                                        <div className="file-preview-thumbnails">
                                                            <div className="file-preview-frame krajee-default kv-preview-thumb" id="preview-1677473955785_72-0" data-fileindex={0} data-template="image">
                                                                <div className="kv-file-content">
                                                                    {thumbs}
                                                                </div>
                                                                <div className="file-thumbnail-footer">
                                                                    <div className="file-footer-caption">
                                                                        <div className="file-caption-info">{selectfile}</div>
                                                                        <div className="file-size-info"> <samp>({filesize})</samp></div>
                                                                    </div>
                                                                    <div className="file-upload-indicator" title="Not uploaded yet"><i className="icon-file-plus text-success" /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="file-caption icon-visible">
                                        <div className="input-group" tabIndex={500}>
                                            <input readOnly className="file-caption-name form-control kv-fileinput-caption" defaultValue={selectfile || ''} placeholder="Select file..." />
                                            <span className="file-caption-icon"><i className="glyphicon glyphicon-file" /></span>
                                            {isActive ?
                                                <Button onClick={open} className="btn btn-primary btn-file"><i className="ph-file-plus me-2" /><span>Browse</span></Button>
                                                :
                                                <><Button onClick={handleRemove} type="button" tabIndex={500} title="Clear selected files" className="btn btn-light fileinput-remove fileinput-remove-button"><i className="ph-x fs-base me-2" />  <span className="hidden-xs">Remove</span></Button>
                                                    <Button type="submit" tabIndex={500} title="Upload selected files" className="btn btn-light fileinput-upload fileinput-upload-button"><i className="ph-file-arrow-up me-2" />  <span className="hidden-xs">Upload</span></Button>
                                                    <Button onClick={open} className="btn btn-primary btn-file"><i className="ph-file-plus me-2" /><span className="">Browse</span></Button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    {profileimageError && <div className="form-text text-danger">
                                        {/* <i className="ph-x-circle me-1"></i> */}
                                        {profileimageError}
                                    </div>}
                                </Col>
                            </Row>
                            <div className="text-end">
                                <Button onClick={handleCancel} className="btn btn-secondary ml-3 btn-secondaryclose" title="Cancel"><i className="icon-cross2 mr-2" />Cancel</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangeAvatar;