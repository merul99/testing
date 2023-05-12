import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import RHFInput from '../components/RHFInput'

const BasicFormInfo = ({ formTitle }) => {
    const { register, formState: { errors }, control } = useFormContext()

    return (
        <Card>
            <Card.Header className='px-3' >
                <h4>{formTitle}</h4>
            </Card.Header>
            <Card.Body>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "First Name is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Last name is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <Form.Label>Gender</Form.Label>
                        <div className='d-flex'>
                            <Form.Check
                                type="radio"
                                name="gender"
                                {...register('gender', { required: "Required field" })}
                                label="Male"
                                className='mx-2'
                                value="male" />
                            <Form.Check
                                type="radio"
                                name="gender"
                                {...register('gender', { required: "Required field" })}
                                label="Female" className='mx-2' />
                            <Form.Check
                                type="radio"
                                name="gender"
                                {...register('gender', { required: "Required field" })}
                                label="Other" className='mx-2' />
                        </div>
                        <Form.Text className="text-danger">{errors.gender && errors.gender.message}</Form.Text>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            type="number"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Phone is required.", minLength: { value: 10, message: "Please enter valid Phone number" }, maxLength: { value: 10, message: "Only 10 digits are valid as number" } }}
                        />
                    </Col>
                </Row>
                {/* <Row>
                    <div className="mt-3 text-center">
                        <Button
                            className='mx-3'
                            variant='outline-secondary'
                            onClick={() => {
                            }}
                        >
                            Prev
                        </Button>
                        <Button
                            type='submit'
                            variant='outline-primary'
                        >
                            Next
                        </Button>
                    </div>
                </Row> */}
            </Card.Body>
        </Card >
    )
}

export default BasicFormInfo