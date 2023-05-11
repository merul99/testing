import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm, useFormContext } from 'react-hook-form'
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
            const updatedDegree = { ...editableDegreeData, collageName: values.collageName, degree: values.degree }
            const foundDegree = data.education.degreeDetails.find((degree) => degree.id === editableDegreeData.id)
            const index = data.education.degreeDetails.indexOf(foundDegree)
            data.education.degreeDetails[index] = updatedDegree
            setData({ ...data })
            setEditMode(false)
        } else {
            const education = {
                education: {
                    degreeDetails: [...data?.education?.degreeDetails, {
                        id: Date.now(),
                        collageName: values.collageName,
                        degree: values.degree,
                        semesterDetails: []
                    }]
                }
            }
            setData({ ...data, ...education })
        }
        reset()
        handleToggle()
    }

    // const handleSubmitWithoutPropagation = (e) => {
    //     e.preventDefault();
    //     // e.stopPropagation();
    //     console.log('e at degree', e)
    //     handleSubmit(submitHandler)(e);
    // };


    return (
        <Card>
            {formTitle && <Card.Header className='px-3'>
                <h5>{formTitle}</h5>
            </Card.Header>}
            <Card.Body>
                {/* <Form onSubmit={handleSubmitWithoutPropagation}> */}
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
                {/* </Form> */}
            </Card.Body>
        </Card >
    )
}

export default DegreeDetailsForm