import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import BasicFormInfo from './basicInfoForm'
import AccountForm from './accountForm'
import AddressForm from './addressForm'
import EducationForm from './educationForm'
import FinalOutput from './finalOutput'

const MainForm = () => {
    const methods = useForm()
    const [page, setPage] = useState(0);
    const formTitles = ["Basic Information", "Account Information", "Address Information", "Education Information"];

    const initialState = {
        username: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        state: "",
        city: "",
        pincode: "",
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        education: {
            degreeDetails: []
        }
    }

    const [data, setData] = useState(initialState)

    const submitHandler = (values) => {
        console.log("This runs...");
        const updatedData = { ...data, ...values };
        if (page === formTitles.length - 1) {
            console.log('data', updatedData);
            localStorage.setItem("Data", JSON.stringify(updatedData));
        }
        setData(updatedData);
        setPage((currPage) => currPage + 1);
    };

    const PageDisplay = (page) => {
        if (page === 0) {
            return <BasicFormInfo formTitle={formTitles[0]} data={data} setData={setData} />
        } else if (page === 1) {
            return <AccountForm formTitle={formTitles[1]} data={data} setData={setData} />
        } else if (page === 2) {
            return <AddressForm formTitle={formTitles[2]} data={data} setData={setData} />
        } else if (page === 3) {
            return <EducationForm formTitle={formTitles[3]} data={data} setData={setData} page={page} setPage={setPage} />
        } else {
            return <FinalOutput data={data} setData={setData} formTitles={formTitles} />
        }
    };

    return (
        <Card className='w-75 mt-5 m-auto'>
            <Card.Header>
                <h3 className='text-center'>Nested Form In Multi Step Form</h3>
            </Card.Header>
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(submitHandler)}>
                    <Card.Body>{PageDisplay(page)}</Card.Body>
                    {page < 4 && <Card.Footer className="text-center">
                        <Button
                            className='mx-3'
                            variant='outline-secondary'
                            disabled={page === 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                        >
                            Prev
                        </Button>
                        <Button
                            type='submit'
                            variant='outline-primary'>
                            {page === formTitles.length - 1 ? "Submit" : "Next"}
                        </Button>
                    </Card.Footer>}
                </Form>
            </FormProvider>
        </Card>
    )
}

export default MainForm