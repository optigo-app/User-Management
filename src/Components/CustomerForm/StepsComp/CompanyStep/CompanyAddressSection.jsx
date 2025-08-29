import React, { useState, useEffect } from "react";
import { Box, Grid, FormHelperText } from "@mui/material";
import { MapPin, Phone } from "lucide-react";
import { FormField, Input, InputWithIcon, Select, CollapsibleSection } from "../../../Ui";
import CustomInput from "../../../Ui/CustomInput";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";

const CompanyAddressSection = ({ expandedSections, onToggleSection, formData, errors, onUpdate }) => {
  const [addressData, setAddressData] = useState({
    city: "",
    state: "",
    country: "",
    area: "",
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    mobile: "",
    telephone: "",
  });

  useEffect(() => {
    if (formData) {
      setAddressData({
        city: formData?.city || "",
        state: formData.state || "",
        country: formData.country || "",
        area: formData.area || "",
        postalCode: formData.postalCode || "",
        addressLine1: formData.addressLine1 || "",
        addressLine2: formData.addressLine2 || "",
        mobile: formData.mobile || "",
        telephone: formData.telephone || "",
      });
    }
  }, [formData]);

  const handleLocalUpdate = (field, value) => {
    setAddressData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleReduxUpdate = () => {
    onUpdate(addressData);
  };

  const handleSelectChange = (field, value) => {
    const updatedState = { ...addressData, [field]: value };
    setAddressData(updatedState);
    onUpdate(updatedState);
  };

  return (
    <CollapsibleSection
      isOpen={expandedSections.companyAddress}
      onToggle={() => onToggleSection("companyAddress")}
      icon={MapPin}
      gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      title="Company Address"
      subtitle="Business location and contact details"
      fieldCount="8+ fields"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid item size={{ sm: 12, md: 4 }}>
            <FormField label="City">
              <CustomInput
                placeholder="City name"
                value={addressData?.city}
                onChange={(e) => handleLocalUpdate("city", e.target.value)}
                onBlur={handleReduxUpdate}
                // error={errors?.city}
                // helperText="City name is required"
              />
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 4 }}>
            <FormField label="State/Province">
              <CustomAutocomplete
                label="State/Province"
                placeholder="Select state"
                value={addressData.state}
                onChange={(e, newValue) => handleSelectChange("state", newValue)}
                options={[
                  { value: "ca", label: "California" },
                  { value: "ny", label: "New York" },
                  { value: "tx", label: "Texas" },
                ]}
                // error={!!errors?.state}
                // helperText="State/Province is required"
              />
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 4 }}>
            <FormField label="Country">
              <CustomAutocomplete
                label="Country"
                placeholder="Select country"
                value={addressData.country}
                onChange={(e, newValue) => handleSelectChange("country", newValue)}
                options={[
                  { value: "us", label: "🇺🇸 United States" },
                  { value: "in", label: "🇮🇳 India" },
                  { value: "uk", label: "🇬🇧 United Kingdom" },
                ]}
                // error={!!errors?.country}
                // helperText="Country is required"
              />
              {errors?.country && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.country}</FormHelperText>}
            </FormField>
          </Grid>
        </Grid>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Area/District">
              <CustomInput
                placeholder="Area or district"
                value={addressData.area}
                onChange={(e) => handleLocalUpdate("area", e.target.value)}
                onBlur={handleReduxUpdate}
                // error={!!errors?.area}
                // helperText="Area/District is required"
              />
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Postal/Zip Code">
              <CustomInput
                placeholder="Postal code"
                value={addressData.postalCode}
                onChange={(e) => handleLocalUpdate("postalCode", e.target.value)}
                onBlur={handleReduxUpdate}
                // error={!!errors?.postalCode}
                // helperText="Postal code is required"
              />
              {errors?.postalCode && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.postalCode}</FormHelperText>}
            </FormField>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormField label="Address Line 1" error={!!errors?.addressLine1}>
            <CustomInput
              placeholder="Street address, building number"
              value={addressData.addressLine1}
              onChange={(e) => handleLocalUpdate("addressLine1", e.target.value)}
              onBlur={handleReduxUpdate}
            />
          </FormField>
          <FormField label="Address Line 2" error={!!errors?.addressLine2}>
            <CustomInput
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={addressData.addressLine2}
              onChange={(e) => handleLocalUpdate("addressLine2", e.target.value)}
              onBlur={handleReduxUpdate}
            />
          </FormField>
        </Box>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Company Mobile" error={!!errors?.mobile}>
              <CustomInput
                placeholder="Mobile number"
                value={addressData.mobile}
                onChange={(e) => handleLocalUpdate("mobile", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Company Telephone" error={!!errors?.telephone}>
              <CustomInput
                placeholder="Landline number"
                value={addressData.telephone}
                onChange={(e) => handleLocalUpdate("telephone", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
        </Grid>
      </Box>
    </CollapsibleSection>
  );
};

export default CompanyAddressSection;