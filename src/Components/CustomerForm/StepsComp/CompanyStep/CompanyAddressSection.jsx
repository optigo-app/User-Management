import React, { useState, useEffect } from "react";
import { Box, Grid, FormHelperText } from "@mui/material";
import { MapPin, Phone } from "lucide-react";
import { FormField, Input, InputWithIcon, Select, CollapsibleSection } from "../../../Ui";

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
            <FormField label="City" error={!!errors?.city}>
              <Input
                placeholder="City name"
                value={addressData?.city}
                onChange={(e) => handleLocalUpdate("city", e.target.value)}
                onBlur={handleReduxUpdate}
              />
              {errors?.city && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.city}</FormHelperText>}
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 4 }}>
            <FormField label="State/Province" error={!!errors?.state}>
              <Select
                placeholder="Select state"
                value={addressData.state}
                onChange={(e) => handleSelectChange("state", e.target.value)}
                options={[
                  { value: "ca", label: "California" },
                  { value: "ny", label: "New York" },
                  { value: "tx", label: "Texas" },
                ]}
              />
              {errors?.state && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.state}</FormHelperText>}
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 4 }}>
            <FormField label="Country" error={!!errors?.country}>
              <Select
                placeholder="Select country"
                value={addressData.country}
                onChange={(e) => handleSelectChange("country", e.target.value)}
                options={[
                  { value: "us", label: "🇺🇸 United States" },
                  { value: "in", label: "🇮🇳 India" },
                  { value: "uk", label: "🇬🇧 United Kingdom" },
                ]}
              />
              {errors?.country && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.country}</FormHelperText>}
            </FormField>
          </Grid>
        </Grid>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Area/District" error={!!errors?.area}>
              <Input
                placeholder="Area or district"
                value={addressData.area}
                onChange={(e) => handleLocalUpdate("area", e.target.value)}
                onBlur={handleReduxUpdate}
              />
              {errors?.area && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.area}</FormHelperText>}
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Postal/Zip Code" error={!!errors?.postalCode}>
              <Input
                placeholder="Postal code"
                value={addressData.postalCode}
                onChange={(e) => handleLocalUpdate("postalCode", e.target.value)}
                onBlur={handleReduxUpdate}
              />
              {errors?.postalCode && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.postalCode}</FormHelperText>}
            </FormField>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormField label="Address Line 1" error={!!errors?.addressLine1}>
            <Input
              placeholder="Street address, building number"
              value={addressData.addressLine1}
              onChange={(e) => handleLocalUpdate("addressLine1", e.target.value)}
              onBlur={handleReduxUpdate}
            />
            {errors?.addressLine1 && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.addressLine1}</FormHelperText>}
          </FormField>
          <FormField label="Address Line 2" error={!!errors?.addressLine2}>
            <Input
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={addressData.addressLine2}
              onChange={(e) => handleLocalUpdate("addressLine2", e.target.value)}
              onBlur={handleReduxUpdate}
            />
            {errors?.addressLine2 && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.addressLine2}</FormHelperText>}
          </FormField>
        </Box>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Company Mobile" error={!!errors?.mobile}>
              <InputWithIcon
                icon={Phone}
                type="tel"
                placeholder="Mobile number"
                value={addressData.mobile}
                onChange={(e) => handleLocalUpdate("mobile", e.target.value)}
                onBlur={handleReduxUpdate}
              />
              {errors?.mobile && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.mobile}</FormHelperText>}
            </FormField>
          </Grid>
          <Grid item size={{ sm: 12, md: 6 }}>
            <FormField label="Company Telephone" error={!!errors?.telephone}>
              <Input
                placeholder="Landline number"
                value={addressData.telephone}
                onChange={(e) => handleLocalUpdate("telephone", e.target.value)}
                onBlur={handleReduxUpdate}
              />
              {errors?.telephone && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors?.telephone}</FormHelperText>}
            </FormField>
          </Grid>
        </Grid>
      </Box>
    </CollapsibleSection>
  );
};

export default CompanyAddressSection;