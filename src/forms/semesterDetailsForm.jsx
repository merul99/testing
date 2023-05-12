import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import RHFInput from '../components/RHFInput'
import DialogBox from '../components/DialogBox'


const SemesterDetailsForm = ({ formTitle, data, setData, degreeid, degree, }) => {
    const { handleSubmit, formState: { errors }, control, reset, setValue } = useFormContext()
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [semesterID, setSemesterID] = useState(null)
    const [semesterEditMode, setSemesterEditMode] = useState(false)
    const [editableSemesterData, setEditableSemesterData] = useState(null)

    const handleToggle = (e) => {
        e?.preventDefault()
        setIsModelOpen(!isModelOpen);
    };

    useEffect(() => {
        if (semesterEditMode) {
            setValue('semester', editableSemesterData?.semester)
            setValue('percentage', editableSemesterData?.percentage)
            setValue('remarks', editableSemesterData?.remarks)
        } else {
            setEditableSemesterData(null)
            setValue()
        }
        // eslint-disable-next-line
    }, [semesterEditMode])

    const editSemesterHandler = (semesterId, degreeId) => {
        const foundDegree = data.education.degreeDetails.find((degree) => degree.id === degreeId);
        if (!foundDegree) return;
        const foundedSemester = foundDegree.semesterDetails.find((semester) => semester.id === semesterId);
        if (!foundedSemester) return;
        setEditableSemesterData(foundedSemester);
        setSemesterID(semesterId);
        setSemesterEditMode(true);
        handleToggle();
    };

    const deleteSemesterHandler = (semesterId, degreeId) => {
        const foundDegree = data.education.degreeDetails.find((degree) => degree.id === degreeId);
        if (!foundDegree) return;
        const foundedSemesterIndex = foundDegree.semesterDetails.findIndex((semester) => semester.id === semesterId);
        if (foundedSemesterIndex === -1) return;
        foundDegree.semesterDetails.splice(foundedSemesterIndex, 1);
        setData((prevData) => ({
            ...prevData,
            education: {
                ...prevData.education,
                degreeDetails: prevData.education.degreeDetails.map((degree) =>
                    degree.id === degreeId ? { ...degree, semesterDetails: foundDegree.semesterDetails } : degree
                ),
            },
        }));
    };

    const submitHandler = (values) => {
        if (semesterEditMode) {
            const foundDegree = data.education.degreeDetails.find((degree) => degree.id === degreeid);
            if (!foundDegree) return;
            const foundedSemesterIndex = foundDegree.semesterDetails.findIndex((semester) => semester.id === semesterID);
            if (foundedSemesterIndex === -1) return;

            const updatedSemester = {
                ...editableSemesterData,
                semester: values.semester,
                percentage: values.percentage,
                remarks: values.remarks
            };
            const updatedDegreeDetails = foundDegree.semesterDetails.map((semester, index) =>
                index === foundedSemesterIndex ? updatedSemester : semester
            );
            const updatedDegree = { ...foundDegree, semesterDetails: updatedDegreeDetails };
            const updatedDegreeIndex = data.education.degreeDetails.indexOf(foundDegree);
            const updatedDegreeDetailsList = [
                ...data.education.degreeDetails.slice(0, updatedDegreeIndex),
                updatedDegree,
                ...data.education.degreeDetails.slice(updatedDegreeIndex + 1),
            ];
            setData((prevData) => ({
                ...prevData,
                education: {
                    ...prevData.education,
                    degreeDetails: updatedDegreeDetailsList,
                },
            }));
            setSemesterEditMode(false);
        } else {
            const foundDegree = data.education.degreeDetails.find((deg) => deg.id === degreeid);
            if (!foundDegree) return;
            const updatedSemesterDetails = [
                ...foundDegree.semesterDetails,
                {
                    id: Date.now(),
                    semester: values.semester,
                    percentage: values.percentage,
                    remarks: values.remarks
                },
            ];
            const updatedDegreeDetailsList = data.education.degreeDetails.map((degree) =>
                degree.id === degreeid ? { ...degree, semesterDetails: updatedSemesterDetails } : degree
            );
            setData((prevData) => ({
                ...prevData,
                education: {
                    ...prevData.education,
                    degreeDetails: updatedDegreeDetailsList,
                },
            }));
        }
        reset();
        handleToggle();
    };


    return (
        <>
            <div className='d-flex justify-content-end mb-3'>
                <Button onClick={(e) => {
                    handleToggle(e)
                }}>Add Semester Details</Button>
            </div>

            <DialogBox
                isModelOpen={isModelOpen}
                handleToggle={handleToggle}
                title={"Add Semester Details"}
                degreeId={degreeid}
            >
                <Card>
                    {formTitle && <Card.Header className='px-3'>
                        <h5>{formTitle}</h5>
                    </Card.Header>}
                    <Card.Body>
                        <Row className="mb-1">
                            <Col>
                                <RHFInput
                                    id="semester"
                                    label="Semester"
                                    name="semester"
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                    rules={{ required: "Semester is required." }}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <RHFInput
                                    id="percentage"
                                    label="Percentage"
                                    name="percentage"
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                    rules={{ required: "Percentage is required." }}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <RHFInput
                                    id="remarks"
                                    label="Remark"
                                    name="remarks"
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1 d-flex justify-content-end">
                            <Col className=''>
                                <Button variant='danger' className='mx-2' onClick={(() => {
                                    setSemesterEditMode(false)
                                    handleToggle()
                                    setValue('semester', '')
                                    setValue('percentage', '')
                                    setValue('remarks', '')
                                })}>Cancel</Button>
                                <Button variant='success' type="submit" onClick={handleSubmit(submitHandler)}>Submit</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </DialogBox>
            {degree?.semesterDetails.length > 0 &&
                <Table striped bordered hover className='text-center'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Semester</th>
                            <th>Percentage</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {degree?.semesterDetails.length > 0 && degree?.semesterDetails.map((semester, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>Semester {semester.semester}</td>
                                <td>{semester.percentage} %</td>
                                <td>{semester.remarks}</td>
                                <td>
                                    <Button
                                        size='sm'
                                        variant='outline-primary'
                                        className='mx-2'
                                        onClick={() => { editSemesterHandler(semester.id, degree.id) }}>Edit</Button>
                                    <Button
                                        size='sm'
                                        variant='outline-danger'
                                        className='mx-2'
                                        onClick={() => { deleteSemesterHandler(semester.id, degree.id) }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}
        </>


    )
}

export default SemesterDetailsForm