import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { Input } from '../input';

export const FormikInput = (props) => {
    const [field, meta] = useField(props);

    if (props.select) {
        return (
            <Input
                inputField={{
                    name: field.name,
                    onChange: field.onChange,
                    value: field.value,
                }}
                {...props}
                meta={meta}
            />
        );
    }
    return <Input inputField={field} {...props} meta={meta} />;
};
