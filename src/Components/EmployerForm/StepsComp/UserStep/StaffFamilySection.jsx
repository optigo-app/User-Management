import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Alert,
  IconButton,
  Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  User,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  UserPlus
} from 'lucide-react';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';
import CustomDatePicker from '../../../Ui/CustomDatePicker';
import PhoneInput from '../../../Ui/PhoneInput';

const StaffFamilySection = ({ formData, errors, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  const staffFamily = formData?.staffFamily || [];


  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleAddStaffFamily = () => {
    setCurrentEntry(initializeEntry());
    setIsAddingNew(true);
    setEditingIndex(null);
  };

  const handleEditStaffFamily = (index) => {
    const entry = { ...staffFamily[index] };
    if (entry.birthDate) {
      entry.birthDate = new Date(entry.birthDate);
    }
    if (entry.anniversaryDate) {
      entry.anniversaryDate = new Date(entry.anniversaryDate);
    }
    setCurrentEntry(entry);
    setEditingIndex(index);
    setIsAddingNew(false);
  };

  const handleDeleteStaffFamily = (index) => {
    const updatedStaffFamily = staffFamily.filter((_, i) => i !== index);
    onUpdate({ ...formData, staffFamily: updatedStaffFamily });
  };

  const handleSaveStaffFamily = () => {
    if (!currentEntry.firstName || !currentEntry.lastName) {
      alert('Please fill in required fields');
      return;
    }

    // Convert Date objects to ISO strings for Redux
    const entryForRedux = {
      ...currentEntry,
      birthDate: currentEntry.birthDate ? currentEntry.birthDate.toISOString().split('T')[0] : null,
      anniversaryDate: currentEntry.anniversaryDate ? currentEntry.anniversaryDate.toISOString().split('T')[0] : null
    };

    let updatedStaffFamily;
    if (isAddingNew) {
      updatedStaffFamily = [...staffFamily, entryForRedux];
    } else {
      updatedStaffFamily = staffFamily.map((item, index) =>
        index === editingIndex ? entryForRedux : item
      );
    }

    // Update Redux only when saving
    onUpdate({ ...formData, staffFamily: updatedStaffFamily });
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setCurrentEntry(null);
    setEditingIndex(null);
    setIsAddingNew(false);
  };

  // Initialize empty entry structure
  const initializeEntry = () => ({
    firstName: '',
    lastName: '',
    designation: '',
    birthDate: null,
    age: '',
    anniversaryDate: null,
    city: '',
    mobile: '',
    countryCode: '+1',
    email: '',
    referenceName: '',
    referenceNumber: '',
    referenceAddress: '',
    isDefault: false
  });

  const handleLocalUpdate = (field, value) => {
    setCurrentEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleBirthDateChange = (date) => {
    const age = calculateAge(date);
    setCurrentEntry(prev => ({
      ...prev,
      birthDate: date,
      age: age
    }));
  };

  const designationOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'child', label: 'Child' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={handleAddStaffFamily}
          size="medium"
        >
          Add
        </Button>
      </Box>

      {/* Staff Family List */}
      <Grid container spacing={2}>
        {staffFamily.map((person, index) => (
          <Grid size={{ xs: 12 }} key={person.id || index}>
            <Card variant="outlined">
              <CardHeader
                sx={{ pb: '0px !important' }}
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1">
                      {person.firstName} {person.lastName}
                    </Typography>
                    {person.isDefault && <Chip label="Primary" color="primary" size="small" />}
                  </Box>
                }
                subheader={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {person.designation} • {person.city} • Age: {person.age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {person.mobile} • {person.email}
                    </Typography>
                  </Box>
                }
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditStaffFamily(index)}
                      color="primary"
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteStaffFamily(index)}
                      color="error"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent sx={{ pb: '10px !important' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2">
                      <strong>Birth Date:</strong> {person.birthDate ? new Date(person.birthDate).toLocaleDateString() : 'Not specified'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2">
                      <strong>Anniversary:</strong> {person.anniversaryDate ? new Date(person.anniversaryDate).toLocaleDateString() : 'Not specified'}
                    </Typography>
                  </Grid>
                  {(person.referenceName || person.referenceNumber || person.referenceAddress) && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Reference:
                      </Typography>
                      <Box sx={{ ml: 2, mb: 1 }}>
                        <Typography variant="body2">
                          <strong>{person.referenceName}</strong> - {person.referenceNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {person.referenceAddress}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Form */}
      {(isAddingNew || editingIndex !== null) && currentEntry && (
        <Card variant="outlined">
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <UserPlus size={20} />
                <Typography variant="h6">
                  {isAddingNew ? 'Add New Person' : 'Edit Person'}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Grid container rowSpacing={0} columnSpacing={2}>
              {/* Basic Information */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Basic Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="First Name" required>
                  <CustomInput
                    placeholder="Enter first name"
                    value={currentEntry.firstName}
                    onChange={(e) => handleLocalUpdate('firstName', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Last Name" required>
                  <CustomInput
                    placeholder="Enter last name"
                    value={currentEntry.lastName}
                    onChange={(e) => handleLocalUpdate('lastName', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Designation/Relation">
                  <CustomAutocomplete
                    value={designationOptions.find(option => option.value === currentEntry.designation) || null}
                    onChange={(e, newValue) => handleLocalUpdate('designation', newValue?.value || '')}
                    placeholder="Select designation or relation"
                    options={designationOptions}
                    getOptionLabel={(option) => option.label}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="City">
                  <CustomInput
                    placeholder="Enter city"
                    value={currentEntry.city}
                    onChange={(e) => handleLocalUpdate('city', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Birth Date">
                  <CustomDatePicker
                    value={currentEntry.birthDate}
                    onChange={handleBirthDateChange}
                    placeholder="Select birth date"
                    maxDate={new Date()}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Age">
                  <CustomInput
                    placeholder="Calculated from birth date"
                    value={currentEntry.age}
                    disabled
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Anniversary Date">
                  <CustomDatePicker
                    value={currentEntry.anniversaryDate}
                    onChange={(date) => handleLocalUpdate('anniversaryDate', date)}
                    placeholder="Select anniversary date"
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Email">
                  <CustomInput
                    placeholder="Enter email address"
                    type="email"
                    value={currentEntry.email}
                    onChange={(e) => handleLocalUpdate('email', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Mobile Number">
                  <PhoneInput
                    countryCode={currentEntry.countryCode}
                    setCountryCode={(code) => handleLocalUpdate('countryCode', code)}
                    mobileInput={currentEntry.mobile}
                    setMobileInput={(number) => handleLocalUpdate('mobile', number)}
                    onAddMobile={(code, number) => handleLocalUpdate('mobile', number)}
                  />
                </FormField>
              </Grid>

              {/* Reference Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Reference Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <FormField label="Reference Name">
                  <CustomInput
                    placeholder="Enter reference name"
                    value={currentEntry.referenceName}
                    onChange={(e) => handleLocalUpdate('referenceName', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <FormField label="Reference Number">
                  <CustomInput
                    placeholder="Enter reference number"
                    value={currentEntry.referenceNumber}
                    onChange={(e) => handleLocalUpdate('referenceNumber', e.target.value)}
                  />
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <FormField label="Reference Address">
                  <CustomInput
                    placeholder="Enter reference address"
                    value={currentEntry.referenceAddress}
                    onChange={(e) => handleLocalUpdate('referenceAddress', e.target.value)}
                  />
                </FormField>
              </Grid>

            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              onClick={handleSaveStaffFamily}
            >
              Save Person
            </Button>
            <Button
              variant="outlined"
              startIcon={<X size={16} />}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default StaffFamilySection;
