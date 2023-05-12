import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Form } from 'react-bootstrap'

const RHFInput = ({ isController = true, ...props }) => {
    const {
        name,
        label,
        errorobj,
        control,
        defaultValue,
        onChange,
        placeholder,
        isRequired = true,
        type = "text",
        rules
    } = props;


    let isError = false;
    let errorMessage = "";
    let disabled = false;
    let someValue = "";

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name]?.message;
    }

    if (defaultValue !== undefined) {
        someValue = defaultValue;
    }

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={someValue}
            rules={rules}
            render={({ field: { ref, ...field } }) => (
                <Fragment>
                    {label && <Form.Label htmlFor="example-text-input">
                        {label} {isRequired && <span className="text-danger">*</span>}
                    </Form.Label>
                    }
                    <Fragment>
                        <Form.Control
                            autoComplete="off"
                            ref={ref}
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            isInvalid={isError}
                            disabled={disabled}
                            onChange={(_) => {
                                if (_?.target?.type === "text") {
                                    field.onChange(_.target.value);
                                    return !onChange ? field.onChange(_.target.value) : onChange(_);
                                }
                                field.onChange(_.target.value);
                                return !onChange ? field.onChange(_.target.value) : onChange(_);
                            }}
                        />
                        {isError && (
                            <Form.Text className="text-danger">{errorMessage}</Form.Text>
                        )}
                    </Fragment>
                </Fragment>
            )}
        />
    );
};

export default RHFInput;
