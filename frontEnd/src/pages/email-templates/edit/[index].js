import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { GetDetailsById, UpdateApiDetails } from "../../api/axiosRequest";
import { toast } from 'react-toastify';
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingPage from "@/components/common/loadingPage";
import CommonButton from "@/components/common/button";
import Head from "next/head";
import PermissionHelper from "@/components/common/helper";
import ErrorPage from "@/pages/404";

const Edit = () => {
    const router = useRouter();
    const id = router.query;
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [SubjectError, setSubjectError] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');
    const [bodyerror, setBodyError] = useState('');
    const [content, setContent] = useState('');
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState([{ subject: "", description: "" }]);
    const [subject, setSubject] = useState('');
    const [AllData, setAlldata] = useState({
        subject: '',
        description: '',
    })

    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };

    let Viewdata = async () => {
        setLoading(true);
        if (id.index) {
            const resp = await GetDetailsById(id.index, "email-templates");
            setAlldata(resp.data.document);
            const data = resp.data.document.key_words
            setContent(resp.data.document.template_text);
            if (data.length === 0) {
                setFormValues([{}]);
            } else {
                setFormValues(resp.data.document.key_words);
            }
            setLoading(false);
        }
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            subject: AllData.subject,
            description: AllData.description,
            template_text: content,
            key_words: formValues,
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (content === '') {
            setBodyError("Please enter text body.")
        }
        else {
            setLoading(true);
            return UpdateApiDetails(data, id.index, "email-templates")
                .then((resp) => {
                    toast.success(resp.data.message);
                    router.push(`/email-templates`);
                    setAlldata('');
                    setLoading(false);
                    setSubjectError('');
                    setDescriptionError('');
                    setBodyError(''); setContent('');
                }).catch((error) => {
                    setLoading(false);
                    setSubjectError(error?.response?.data.error.errors?.subject?.message);
                    setDescriptionError(error?.response?.data.error.errors?.description?.message);
                    setBodyError(error?.response?.data.error.errors?.template_text?.message);
                })
        }
    }
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        setSubject(newFormValues.map((item) => { return (item.subject) }));
    }
    let addFormFields = () => {
        setFormValues([...formValues, { subject: "", description: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    const html = {
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true
                }
            ]
        }
    }
    useEffect(() => {
        setEditorLoaded(true);
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("ckeditor5-custom-build/build/ckeditor"),
        };
        Viewdata();
    }, [id.index]);
    return (
        <>
            <Head>
                <title>{AllData?.subject} | Limitless</title>
            </Head>
            <PermissionHelper Permissionname="edit-emailtemplates" errorpage={<ErrorPage />}>
                <div className="page-header page-header-light shadow">
                    <div className="page-header-content d-lg-flex">
                        <div className="d-flex">
                            <h4 className="page-title mb-0">
                                Email Templates
                            </h4>
                            <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                                <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                            </Link>
                        </div>
                        <div className="collapse d-lg-block my-lg-auto ms-lg-auto" id="page_header">

                        </div>
                    </div>
                    <div className="page-header-content d-lg-flex border-top">
                        <div className="d-flex">
                            <div className="breadcrumb py-2">
                                <Link href="/" className="me-2"><i className="ph-house" /></Link>
                                <Link href="/" className="breadcrumb-item">Home</Link>
                                <Link href="/email-templates" className="breadcrumb-item">Email Templates</Link>
                                <span className="breadcrumb-item active">Edit</span>
                            </div>
                            <Link href="/" className="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                                <i className="ph-caret-down collapsible-indicator ph-sm m-1" />
                            </Link>
                        </div>
                        <div className="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                        </div>
                    </div>
                </div>
                {/* Content area */}
                <div className="content">
                    {/* Centered forms */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header header-elements-inline">
                                    <h6 className="card-title">Email Templates</h6>
                                </div>
                                {loading ?
                                    <LoadingPage />
                                    : null}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="justified-right-icon-tab1">
                                            <div className="tab-content">
                                                <div className="tab-pane fade active show" id="profile">
                                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                        <Row>
                                                            <Col className="col-md-6 form-group">
                                                                <Form.Group>
                                                                    <Form.Label>Subject</Form.Label><span className="text-danger"> * </span>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        name="subject"
                                                                        value={AllData.subject}
                                                                        onChange={handleAllChange}
                                                                        placeholder="Enter subject"
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        <label className="validation-invalid-label">
                                                                            Subject is required
                                                                        </label>
                                                                    </Form.Control.Feedback>
                                                                    <label className="validation-invalid-label">
                                                                        {SubjectError}
                                                                    </label>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className="col-md-6 form-group">
                                                                <Form.Group>
                                                                    <Form.Label>Description</Form.Label><span className="text-danger"> * </span>
                                                                    <Form.Control
                                                                        required
                                                                        type="text"
                                                                        name="description"
                                                                        value={AllData.description}
                                                                        onChange={handleAllChange}
                                                                        placeholder="Enter description"
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        <label className="validation-invalid-label">
                                                                            Description is required
                                                                        </label>
                                                                    </Form.Control.Feedback>
                                                                    <label className="validation-invalid-label">
                                                                        {DescriptionError}
                                                                    </label>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className="col-md-12 col mt-3">
                                                                <Form.Label>Body</Form.Label><span className="text-danger"> * </span>
                                                                {editorLoaded ?
                                                                    <>
                                                                        <CKEditor
                                                                            editor={ClassicEditor}
                                                                            config={html}
                                                                            data={content}
                                                                            onChange={(event, editor) => {
                                                                                const data = editor.getData();
                                                                                setContent(data);
                                                                            }}
                                                                        />
                                                                    </>
                                                                    : <LoadingPage />}
                                                                {bodyerror &&
                                                                    <div className="form-text text-danger">
                                                                        <i className="ph-x-circle me-1"></i>
                                                                        {bodyerror}
                                                                    </div>
                                                                }
                                                            </Col>
                                                        </Row>
                                                        {formValues.map((element, index) => (
                                                            <Row className="mt-4" key={index}>
                                                                <div className='col-md-3'>
                                                                    <Row>
                                                                        <Col className="col-md-12">
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="subject"
                                                                                value={element.subject || ""}
                                                                                onChange={e => handleChange(index, e)}
                                                                                placeholder="Enter subject"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    <Row>
                                                                        <Col className="col-md-12">
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="description"
                                                                                value={element.description || ""}
                                                                                onChange={e => handleChange(index, e)}
                                                                                placeholder="Enter description"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                {
                                                                    index ?
                                                                        <div className='col-md-3'>
                                                                            <Row>
                                                                                <Col className="col-md-12">
                                                                                    <button className="btn btn-light btn-labeled btn-labeled-start" title="Remove" type="button" onClick={() => removeFormFields(index)}><span className="btn-labeled-icon bg-black bg-opacity-20"><i className="ph ph-x"></i></span>Remove</button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                        :
                                                                        <div className='col-md-3'>
                                                                            <Row>
                                                                                <Col className="col-md-12">
                                                                                    <button className="btn btn-primary btn-labeled btn-labeled-start" id="add_more" title="Add more" type="button" onClick={() => addFormFields()}><span className="btn-labeled-icon bg-black bg-opacity-20"><i className="ph ph-folder-plus"></i></span>Add more </button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                }
                                                            </Row>
                                                        ))}
                                                        <div className='add-more' ></div>
                                                        <div className="text-end">
                                                            <CommonButton link="/email-templates" />
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /form centered */}
                </div>
            </PermissionHelper>
            {/* /content area */}
        </>
    )
}
export default Edit;