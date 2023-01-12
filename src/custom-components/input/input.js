import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useState } from 'react';

export const Input = ({
    name,
    type = 'text',
    inputText = 'Enter Data',
    id = 'default',
    select = false,
    options,
    meta,
    inputField,
    ...props
}) => {
    console.log(inputField);
    const [selected, setSelected] = useState('');
    const handleChangeSelect = (evt) => {
        setSelected(evt.target.value);
    };
    if (select) {
        return (
            <FormControl fullWidth error={meta?.error && false} {...props} sx={{ my: 2 }}>
                <InputLabel id={'input-label' + id}>{inputText}</InputLabel>

                <Select
                    {...inputField}
                    sx={{
                        '&:focus': {
                            borderRadius: 'inherit',
                        },
                        overflow: 'hidden',
                    }}
                    labelId={'input-label' + id}
                    type={type}
                    id={id}
                    name={name}
                    value={selected}
                    defaultValue={''}
                    onChange={handleChangeSelect}
                    label={inputText}
                >
                    {options &&
                        options?.map((option) => (
                            <MenuItem key={option?.value} value={option?.value}>
                                {option?.text}
                            </MenuItem>
                        ))}
                </Select>
                {meta?.error && (
                    <FormHelperText error id={'form-helper-' + id}>
                        {meta?.error || 'error'}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

    return (
        <FormControl fullWidth error={meta?.error && false} {...props} sx={{ my: 2 }}>
            <InputLabel htmlFor={'outlined-adornment-' + id}>{inputText}</InputLabel>
            <OutlinedInput {...inputField} id={id} type={type} name={name} label={inputText} inputProps={{}} />
            {meta?.error && (
                <FormHelperText error id={'form-helper-' + id}>
                    {meta?.error || 'error'}
                </FormHelperText>
            )}
        </FormControl>
    );
};
