import Link from 'next/link';
import Button from 'react-bootstrap/Button';

const CommonButton = ({ link }) => {
    return (
        <>
            <Link href={link} className="btn btn-light my-1 me-2 btn-labeled btn-labeled-start" title="Cancel"><span className="btn-labeled-icon bg-black bg-opacity-20">
                <i className="ph ph-x" />
            </span> Cancel</Link>
            <Button className="btn btn-primary btn-labeled btn-labeled-start" type="submit" title="Save"><span className="btn-labeled-icon bg-black bg-opacity-20"><i className="ph ph-folder-plus"></i></span>Save</Button>
        </>
    )
}
export default CommonButton;