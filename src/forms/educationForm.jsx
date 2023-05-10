import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { AiFillFileAdd, AiFillEdit, AiOutlineDelete } from "react-icons/ai";

const EducationForm = ({ formTitle }) => {
    const [isModelOpen, setIsModelOpen] = useState(false)

    const handleToggle = () => {
        setIsModelOpen(!isModelOpen);
    };
    return (
        <Card>
            <Card.Header className='px-3 d-flex justify-content-between'>
                <h4>{formTitle}</h4>
                <div className="col d-flex justify-content-end align-items-end">
                    <button className='btn btn-outline-success' onClick={handleToggle}>
                        <AiFillFileAdd style={{ width: "30px", height: "30px", cursor: "pointer" }} />
                    </button>
                </div>
                <h5>Testtttttttttt</h5>
            </Card.Header>
        </Card>
    )
}

export default EducationForm