import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import RHFInput from '../components/RHFInput'

const AddressForm = ({ formTitle }) => {
    const { formState: { errors }, control } = useFormContext()

    return (
        <Card>
            <Card.Header className='px-3'>
                <h4>{formTitle}</h4>
            </Card.Header>
            <Card.Body>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="address1"
                            label="Address 1"
                            name="address1"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Address is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="address2"
                            label="Address 2"
                            name="address2"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Address is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="state"
                            label="State"
                            name="state"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "State is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="city"
                            label="City"
                            name="city"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "City is required." }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="pincode"
                            label="Pin Code"
                            name="pincode"
                            type="number"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{ required: "Pincode is required.", minLength: { value: 5, message: "Please enter valid pincode" } }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AddressForm