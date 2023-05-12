import React, { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import RHFInput from '../components/RHFInput'

const DegreeDetailsForm = ({ formTitle, data, setData, handleToggle, editMode, setEditMode, editableDegreeData }) => {
    const isEditMode = editMode ? true : false
    const { formState: { errors }, control, setValue, handleSubmit, reset } = useFormContext()

    useEffect(() => {
        if (isEditMode) {
            setValue('collageName', editableDegreeData?.collageName)
            setValue('degree', editableDegreeData?.degree)
        } else {
            setValue()
        }
        // eslint-disable-next-line
    }, [])

    const submitHandler = (values) => {
        if (isEditMode) {
            const foundDegree = data.education.degreeDetails.find((degree) => degree.id === editableDegreeData.id);
            if (!foundDegree) return;
            const updatedDegree = { ...editableDegreeData, collageName: values.collageName, degree: values.degree };
            const updatedDegreeDetailsList = data.education.degreeDetails.map((degree) =>
                degree.id === editableDegreeData.id ? updatedDegree : degree
            );
            setData((prevData) => ({
                ...prevData,
                education: {
                    ...prevData.education,
                    degreeDetails: updatedDegreeDetailsList,
                },
            }));
            setEditMode(false);
        } else {
            const updatedDegreeDetails = [
                ...data?.education?.degreeDetails,
                {
                    id: Date.now(),
                    collageName: values.collageName,
                    degree: values.degree,
                    semesterDetails: [],
                },
            ];
            setData((prevData) => ({
                ...prevData,
                education: {
                    ...prevData.education,
                    degreeDetails: updatedDegreeDetails,
                },
            }));
        }
        reset();
        handleToggle();
    };

    return (
        <Card>
            {formTitle && <Card.Header className='px-3'>
                <h5>{formTitle}</h5>
            </Card.Header>}
            <Card.Body>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="collageName"
                            label="Collage Name"
                            name="collageName"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Collage Name is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <RHFInput
                            id="degree"
                            label="Degree"
                            name="degree"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Degree is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1 d-flex justify-content-end">
                    <Col className=''>
                        <Button variant='danger' className='mx-2' onClick={() => handleToggle()}>Cancel</Button>
                        <Button variant='success' type="submit" onClick={handleSubmit(submitHandler)}>Submit</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    )
}

export default DegreeDetailsForm