import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import RHFInput from '../components/RHFInput'

const AccountForm = ({ formTitle }) => {
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
                            id="username"
                            label="User Name"
                            name="username"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{
                                required: "Username is required.", minLength: {
                                    value: 3,
                                    message: 'Minimum 3 character required.'
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="email"
                            label="Email"
                            name="email"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{
                                required: "Email is required.", pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <RHFInput
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            errorobj={errors}
                            control={control}
                            isController={true}
                            rules={{
                                required: "Password is required.", min: {
                                    value: 6,
                                    message: "Minimum 6 character required.",
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AccountForm