import React from 'react'
import { Card, Container, Table } from 'react-bootstrap'

const FinalOutput = ({ data, formTitles }) => {
    console.log('data', data)
    return (
        <Container className='border py-4 w-75'>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[0]}</h4>
                </Card.Header>
                <Card.Body >
                    <div className='d-flex'>
                        <Card.Title>First Name : </Card.Title>
                        <Card.Text>{data?.firstName}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Last Name : </Card.Title>
                        <Card.Text>{data?.lastName}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Gender :  </Card.Title>
                        <Card.Text> {data?.gender}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Contact No : </Card.Title>
                        <Card.Text>{data?.phone}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[1]}</h4>
                </Card.Header>
                <Card.Body>
                    <div className='d-flex'>
                        <Card.Title>Username : </Card.Title>
                        <Card.Text>{data?.username}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Email : </Card.Title>
                        <Card.Text>{data?.email}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Password :  </Card.Title>
                        <Card.Text> {data?.password}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>
                    <h4>{formTitles[2]}</h4>
                </Card.Header>
                <Card.Body>
                    <div className='d-flex'>
                        <Card.Title>Address 1 : </Card.Title>
                        <Card.Text>{data?.address1}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Address 2 : </Card.Title>
                        <Card.Text>{data?.address2}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>State :  </Card.Title>
                        <Card.Text> {data?.state}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>City : </Card.Title>
                        <Card.Text>{data?.city}</Card.Text>
                    </div>
                    <div className='d-flex'>
                        <Card.Title>Pin Code : </Card.Title>
                        <Card.Text>{data?.pincode}</Card.Text>
                    </div>
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