import React from 'react'
import { Card, Container, Table } from 'react-bootstrap'

const FinalOutput = ({ formTitles }) => {
    const data = JSON.parse(localStorage.getItem("Data"))
    return (
        <Container className='border py-4 w-75'>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[0]}</h4>
                </Card.Header>
                <Card.Body >
                    <p className='value-row'>
                        <span className='value-title'>First Name : </span>
                        <span className='value-text'>{data?.firstName}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Last Name : </span>
                        <span className='value-text'>{data?.lastName}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Gender :  </span>
                        <span className='value-text'> {data?.gender}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Contact No : </span>
                        <span className='value-text'>{data?.phone}</span>
                    </p>
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[1]}</h4>
                </Card.Header>
                <Card.Body>
                    <p className='value-row'>
                        <span className='value-title'>Username : </span>
                        <span className='value-text'>{data?.username}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Email : </span>
                        <span className='value-text'>{data?.email}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Password :  </span>
                        <span className='value-text'> {data?.password}</span>
                    </p>
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[2]}</h4>
                </Card.Header>
                <Card.Body>
                    <p className='value-row'>
                        <span className='value-title'>Address 1 : </span>
                        <span className='value-text'>{data?.address1}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Address 2 : </span>
                        <span className='value-text'>{data?.address2}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>State :  </span>
                        <span className='value-text'> {data?.state}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>City : </span>
                        <span className='value-text'>{data?.city}</span>
                    </p>
                    <p className='value-row'>
                        <span className='value-title'>Pin Code : </span>
                        <span className='value-text'>{data?.pincode}</span>
                    </p>
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[3]}</h4>
                </Card.Header>
                <Card.Body>
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

                                    </Card.Header>
                                    <Card.Body>
                                        {degree?.semesterDetails.length > 0 &&
                                            <Table striped bordered hover className='text-center'>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Semester</th>
                                                        <th>Percentage</th>
                                                        <th>Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {degree?.semesterDetails.length > 0 && degree?.semesterDetails.map((semester, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>Semester {semester.semester}</td>
                                                            <td>{semester.percentage} %</td>
                                                            <td>{semester.remarks}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>}
                                    </Card.Body>
                                </Card>
                            </Container>))}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default FinalOutput