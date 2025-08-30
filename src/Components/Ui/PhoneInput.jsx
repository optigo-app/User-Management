import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, MenuItem, Select, FormControl } from '@mui/material';
import './PhoneInput.scss';

const countries = [
    { code: 'US', label: 'United States', phone: '+1' },
    { code: 'GB', label: 'United Kingdom', phone: '+44' },
    { code: 'IN', label: 'India', phone: '+91' },
    { code: 'UY', label: 'Uruguay', phone: '+598' },
    { code: 'NG', label: 'Nigeria', phone: '+234' },
];

const PhoneInput = ({
    countryCode,
    setCountryCode,
    mobileInput,
    setMobileInput,
    onAddMobile,
    error = false,
    onlyCountries = null,
}) => {
    const [value, setValue] = useState(mobileInput || '');

    useEffect(() => {
        setValue(mobileInput);
    }, [mobileInput]);

    const handleCountryChange = (event) => {
        setCountryCode(event.target.value);
    };

    const handleMobileChange = (event) => {
        setValue(event.target.value);
        setMobileInput(event.target.value);
    };

    const currentCountry = countries.find(c => c.phone === countryCode);

    return (
        <div className="phone-input-container">
            <TextField
                value={value}
                onChange={handleMobileChange}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' && value === '') {
                        setCountryCode('');
                    }
                    if (e.key === "Enter") {
                        onAddMobile(countryCode, value);
                        setValue('');
                    }
                }}
                onBlur={() => onAddMobile(countryCode, value)}
                error={error}
                helperText={error ? "Enter a valid phone number" : ""}
                variant="outlined"
                fullWidth
                className="phone-number-field"
                placeholder="Enter a valid phone number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" className="country-adornment">
                            <FormControl variant="outlined" className="country-select-wrapper">
                                <Select
                                    value={countryCode || "+91"}
                                    onChange={handleCountryChange}
                                    className="country-select"
                                    IconComponent={() => null}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 250,
                                            },
                                        },
                                    }}
                                    renderValue={(selected) => (
                                        <div className="selected-country-value">
                                            <span className={`flag-icon flag-icon-${currentCountry?.code.toLowerCase()}`}></span>
                                            <span>{selected}</span>
                                        </div>
                                    )}
                                >
                                    {(onlyCountries || countries).map((country) => (
                                        <MenuItem key={country.code} value={country.phone}>
                                            <span className={`flag-icon flag-icon-${country.code.toLowerCase()}`}></span>
                                            <span>{country.label} ({country.phone})</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default PhoneInput;