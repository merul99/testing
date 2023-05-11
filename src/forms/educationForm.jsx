import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { AiFillFileAdd, AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import DegreeDetailsForm from './degreeDetailsForm';
import DialogBox from '../components/DialogBox'
import SemesterDetailsForm from './semesterDetailsForm';

const EducationForm = ({ formTitle, data, setData }) => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editableDegreeData, setEditableDegreeData] = useState(null)

    const handleToggle = (e) => {
        e?.preventDefault()
        setIsModelOpen(!isModelOpen);
    };

    const deleteHandler = (degreeId) => {
        const foundDegree = data.education.degreeDetails.find((degree) => degree.id === degreeId)
        const index = data.education.degreeDetails.indexOf(foundDegree)
        data.education.degreeDetails.splice(index, 1)
        setData({ ...data })
    }

    const editDegreeHandler = (degreeId, e) => {
        const editableDegree = data.education.degreeDetails.find((degree) => degree.id === degreeId)
        setEditableDegreeData(editableDegree)
        handleToggle(e)
        setEditMode(true)
    }

    return (
        <Card>
            <Card.Header className='px-3 d-flex justify-content-between'>
                <h4>{formTitle}</h4>
                <div className="col d-flex justify-content-end align-items-end">
                    <button className='btn btn-outline-success' onClick={(e) => handleToggle(e)}>
                        <AiFillFileAdd style={{ width: "30px", height: "30px", cursor: "pointer" }} />
                    </button>
                    <DialogBox
                        isModelOpen={isModelOpen}
                        handleToggle={handleToggle}
                        title={"Add Education Details"}>

                        <DegreeDetailsForm
                            data={data}
                            setData={setData}
                            handleToggle={handleToggle}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            editableDegreeData={editableDegreeData}
                        />
                    </DialogBox>
                </div>
            </Card.Header>
            <Card.Body className='align-items-center'>
                {data?.education?.degreeDetails?.length > 0 &&
                    data?.education.degreeDetails.map((degree, index) => (
                        <Container className='w-75 mt-2' key={index}>
                            <Card className='mb-3' >
                                <Card.Header className='d-flex justify-content-between'>
                                    <Card.Title>
                                        Collage Name : {degree.collageName}
                                    </Card.Title>
                                    <h6>
                                        Degree : {degree.degree}
                                    </h6>
                                    <div>
                                        <button className='btn btn-outline-primary mx-3' onClick={(e) => editDegreeHandler(degree.id, e)}>
                                            <AiFillEdit style={{ width: "25px", height: "25px", cursor: "pointer" }}
                                            />
                                        </button>
                                        <button className='btn btn-outline-danger' onClick={() => deleteHandler(degree.id)}>
                                            <AiOutlineDelete style={{ width: "25px", height: "25px", cursor: "pointer", }}
                                            />
                                        </button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className=' mb-3'>
                                        <SemesterDetailsForm
                                            data={data}
                                            setData={setData}
                                            degreeid={degree.id}
                                            degree={degree}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Container>))}
            </Card.Body >
        </Card>
    )
}

export default EducationForm