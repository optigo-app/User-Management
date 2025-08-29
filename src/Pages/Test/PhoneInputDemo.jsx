import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
  MenuList,
  Typography,
  Popper,
  ClickAwayListener,
  Fade,
} from '@mui/material';
import { ChevronDown, Search, Check } from 'lucide-react';

const defaultCountries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
];

const PhoneInput = ({
  // Value props
  value = '',
  defaultCountryCode = '+1',
  onChange = () => {},
  onCountryChange = () => {},
  
  // Configuration props
  countries = defaultCountries,
  placeholder = 'Enter number',
  label = 'Phone number',
  required = false,
  disabled = false,
  
  // Validation props
  error = '',
  helperText = '',
  
  // Styling props
  className = '',
  sx = {},
  
  // Input attributes
  autoFocus = false,
  maxLength,
  
  // Event handlers
  onBlur = () => {},
  onFocus = () => {},
  onKeyDown = () => {},
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    () => countries.find(c => c.code === defaultCountryCode) || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const anchorRef = useRef(null);

  // Update internal state when value prop changes
  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  // Update selected country when defaultCountryCode changes
  useEffect(() => {
    const country = countries.find(c => c.code === defaultCountryCode);
    if (country) {
      setSelectedCountry(country);
    }
  }, [defaultCountryCode, countries]);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
    onCountryChange(country.code, country);
    
    // Call onChange with updated full phone number
    onChange(`${country.code}${phoneNumber}`, country.code, phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);
    onChange(`${selectedCountry.code}${newNumber}`, selectedCountry.code, newNumber);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    onKeyDown(e);
  };

  const styles = {
    container: {
      width: '100%',
      ...sx
    },
    
    label: {
      marginBottom: 1,
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'text.primary'
    },
    
    inputContainer: {
      display: 'flex',
      border: `1px solid ${error ? '#f44336' : '#d1d5db'}`,
      borderRadius: 2,
      backgroundColor: disabled ? '#f9fafb' : '#fff',
      transition: 'all 0.2s',
      '&:focus-within': {
        borderColor: error ? '#f44336' : '#1976d2',
        boxShadow: error 
          ? '0 0 0 3px rgba(244, 67, 54, 0.1)' 
          : '0 0 0 3px rgba(25, 118, 210, 0.1)',
      }
    },
    
    countrySelector: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      px: 1.5,
      py: 1.5,
      borderRight: '1px solid #d1d5db',
      borderRadius: '8px 0 0 8px',
      backgroundColor: disabled ? '#f9fafb' : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    
    phoneInput: {
      flex: 1,
      '& .MuiOutlinedInput-root': {
        border: 'none',
        borderRadius: '0 8px 8px 0',
        '& fieldset': {
          border: 'none',
        },
        '&:hover fieldset': {
          border: 'none',
        },
        '&.Mui-focused fieldset': {
          border: 'none',
        },
      },
      '& .MuiInputBase-input': {
        padding: '12px',
        fontSize: '0.875rem',
        color: disabled ? '#9ca3af' : '#111827',
        backgroundColor: disabled ? '#f9fafb' : 'transparent',
      }
    },
    
    dropdown: {
      width: '100%',
      maxWidth: 320,
      zIndex: 1300,
    },
    
    searchContainer: {
      padding: 2,
      borderBottom: '1px solid #e5e7eb',
    },
    
    searchInput: {
      '& .MuiOutlinedInput-root': {
        fontSize: '0.875rem',
        '& fieldset': {
          borderColor: '#d1d5db',
        },
        '&:hover fieldset': {
          borderColor: '#9ca3af',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1976d2',
          boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
        },
      }
    },
    
    countryList: {
      maxHeight: 192,
      overflow: 'auto',
      padding: 0,
    },
    
    countryItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 2,
      py: 1.5,
      cursor: 'pointer',
      borderRadius: 0,
      justifyContent: 'flex-start',
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
      '&:focus': {
        backgroundColor: '#f9fafb',
      }
    },
    
    selectedCountryItem: {
      backgroundColor: '#eff6ff',
      borderRight: '2px solid #1976d2',
      '&:hover': {
        backgroundColor: '#eff6ff',
      }
    },
    
    flag: {
      fontSize: '1.125rem',
      lineHeight: 1,
    },
    
    countryText: {
      fontSize: '0.875rem',
      color: '#111827',
      flex: 1,
    },
    
    checkIcon: {
      color: '#1976d2',
      fontSize: '1rem',
    },
    
    helperText: {
      marginTop: 1,
      fontSize: '0.875rem',
      color: error ? '#f44336' : '#6b7280',
    }
  };

  return (
    <Box className={className} sx={styles.container}>
      {/* Label */}
      {label && (
        <Typography component="label" sx={styles.label}>
          {label}
          {required && (
            <Box component="span" sx={{ color: '#f44336', ml: 0.5 }}>
              *
            </Box>
          )}
        </Typography>
      )}
      
      <Box sx={{ position: 'relative' }}>
        {/* Main input container */}
        <Box sx={styles.inputContainer}>
          
          {/* Country selector */}
          <Box
            ref={anchorRef}
            component="button"
            type="button"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
            sx={styles.countrySelector}
          >
            <Box component="span" sx={styles.flag}>
              {selectedCountry.flag}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151', minWidth: '3rem' }}>
              {selectedCountry.code}
            </Typography>
            <ChevronDown 
              style={{ 
                color: '#6b7280', 
                fontSize: '1rem',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }} 
              size={16}
            />
          </Box>

          {/* Phone number input */}
          <TextField
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            inputProps={{ maxLength }}
            variant="outlined"
            sx={styles.phoneInput}
          />
        </Box>

        {/* Dropdown */}
        <Popper
          open={isDropdownOpen && !disabled}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          sx={styles.dropdown}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper elevation={8} sx={{ mt: 0.5 }}>
                <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
                  <Box>
                    {/* Search bar */}
                    <Box sx={styles.searchContainer}>
                      <TextField
                        size="small"
                        placeholder="Search for countries"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                        sx={styles.searchInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search style={{ color: '#9ca3af', fontSize: '1rem' }} size={16} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    {/* Country list */}
                    <MenuList sx={styles.countryList}>
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => {
                          const isSelected = selectedCountry.code === country.code && 
                                           selectedCountry.name === country.name;
                          
                          return (
                            <MenuItem
                              key={`${country.code}-${country.name}`}
                              onClick={() => handleCountrySelect(country)}
                              sx={{
                                ...styles.countryItem,
                                ...(isSelected ? styles.selectedCountryItem : {})
                              }}
                            >
                              <Box component="span" sx={styles.flag}>
                                {country.flag}
                              </Box>
                              <Typography sx={styles.countryText}>
                                {country.name} ({country.code})
                              </Typography>
                              {isSelected && (
                                <Check style={{ color: '#1976d2', fontSize: '1rem' }} size={16} />
                              )}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <Box sx={{ px: 2, py: 3, textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            No countries found
                          </Typography>
                        </Box>
                      )}
                    </MenuList>
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>

      {/* Helper text or error */}
      {(error || helperText) && (
        <FormHelperText error={Boolean(error)} sx={styles.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

// Example usage component
const PhoneInputDemo = () => {
  const [phoneData, setPhoneData] = useState({
    fullNumber: '',
    countryCode: '+234',
    localNumber: ''
  });
  const [errors, setErrors] = useState('');

  const handlePhoneChange = (fullNumber, countryCode, localNumber) => {
    setPhoneData({ fullNumber, countryCode, localNumber });
    
    // Example validation
    if (localNumber && localNumber.length < 10) {
      setErrors('Phone number must be at least 10 digits');
    } else {
      setErrors('');
    }
  };

  const handleCountryChange = (countryCode, country) => {
    console.log('Country changed to:', country.name, countryCode);
  };

  const demoStyles = {
    container: {
      maxWidth: 600,
      margin: '0 auto',
      padding: 3,
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 3
    },
    
    section: {
      marginBottom: 4
    },
    
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      marginBottom: 2
    },
    
    valuesDisplay: {
      padding: 2,
      backgroundColor: '#e5e7eb',
      borderRadius: 2,
      '& .value-item': {
        fontSize: '0.875rem',
        marginBottom: 0.5,
        '& strong': {
          fontWeight: 600
        }
      }
    }
  };

  return (
    <Box sx={demoStyles.container}>
      <Typography sx={demoStyles.title}>
        Phone Input Demo
      </Typography>
      
      {/* Basic usage */}
      <Box sx={demoStyles.section}>
        <Typography sx={demoStyles.sectionTitle}>
          Basic Usage
        </Typography>
        <PhoneInput
          defaultCountryCode="+234"
          onChange={handlePhoneChange}
          onCountryChange={handleCountryChange}
          error={errors}
          required
        />
      </Box>

      {/* With custom styling */}
      <Box sx={demoStyles.section}>
        <Typography sx={demoStyles.sectionTitle}>
          With Custom Styling
        </Typography>
        <PhoneInput
          label="Contact Number"
          placeholder="Your phone number"
          defaultCountryCode="+91"
          helperText="We'll use this to contact you"
          sx={{ maxWidth: 400 }}
          onChange={(full, country, local) => console.log('Phone:', { full, country, local })}
        />
      </Box>

      {/* Disabled state */}
      <Box sx={demoStyles.section}>
        <Typography sx={demoStyles.sectionTitle}>
          Disabled State
        </Typography>
        <PhoneInput
          label="Disabled Input"
          value="1234567890"
          defaultCountryCode="+44"
          disabled
        />
      </Box>

      {/* Current values display */}
      <Box sx={demoStyles.valuesDisplay}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Current Values:
        </Typography>
        <Box className="value-item">
          <strong>Full Number:</strong> {phoneData.fullNumber || 'None'}
        </Box>
        <Box className="value-item">
          <strong>Country Code:</strong> {phoneData.countryCode}
        </Box>
        <Box className="value-item">
          <strong>Local Number:</strong> {phoneData.localNumber || 'None'}
        </Box>
        <Box className="value-item">
          <strong>Error:</strong> {errors || 'None'}
        </Box>
      </Box>
    </Box>
  );
};

export default PhoneInputDemo;