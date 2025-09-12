import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

/**
 * Presentational autocomplete edit cell that delegates behavior to parent via callbacks.
 *
 * Props:
 * - value: string | null
 * - options: string[]
 * - onChange: (newValue: string | null) => void
 * - onInputChange?: (newInput: string) => void
 * - onKeyDown?: (event: KeyboardEvent) => void
 * - inputHeight?: number (default 45)
 */
const AutocompleteEditCell = ({
  value,
  options = [],
  onChange,
  onInputChange,
  onKeyDown,
  inputHeight = 45,
}) => {
  const [inputValue, setInputValue] = React.useState(value || '');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (event, newValue) => {
    onChange && onChange(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue ?? '');
    onInputChange && onInputChange(newInputValue ?? '');
  };

  return (
    <Autocomplete
      value={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={onKeyDown}
      options={options}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          autoFocus
          fullWidth
          InputProps={{
            ...params.InputProps,
            disableUnderline: false,
          }}
        />
      )}
      size="small"
      fullWidth
      freeSolo
      autoHighlight
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      ListboxProps={{
        style: {
          maxHeight: 200,
          overflow: 'auto',
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          height: inputHeight,
          minHeight: inputHeight,
          alignItems: 'center',
        },
        '& .MuiAutocomplete-input': {
          fontSize: '0.875rem',
          padding: '10px 8px !important',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: '6px',
        },
        '& .MuiInput-root': {
          padding: '0 !important',
        },
      }}
    />
  );
};

export default AutocompleteEditCell;
