import React, { useState, useEffect } from "react";
import { Box, Grid, Divider, FormHelperText } from "@mui/material";
import { Shield, DollarSign } from "lucide-react";
import { FormField, Input, InputWithIcon, Select, CollapsibleSection } from "../../../Ui";
import CustomInput from "../../../Ui/CustomInput";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";

const TaxRegistrationSection = ({ expandedSections, onToggleSection, formData, errors, onUpdate }) => {
  // Local state to hold form data for this section
  const [taxData, setTaxData] = useState({
    gstNumber: "",
    panNumber: "",
    vatNumber: "",
    serviceTax: "",
    cstNumber: "",
    tanNumber: "",
    creditLimit: "",
    enterpriseType: "",
    cinNumber: "",
    aadhaarNumber: "",
    msmeNumber: "",
  });

  // Effect to synchronize local state with Redux state on initial load or step change
  useEffect(() => {
    if (formData) {
      setTaxData({
        gstNumber: formData.gstNumber || "",
        panNumber: formData.panNumber || "",
        vatNumber: formData.vatNumber || "",
        serviceTax: formData.serviceTax || "",
        cstNumber: formData.cstNumber || "",
        tanNumber: formData.tanNumber || "",
        creditLimit: formData.creditLimit || "",
        enterpriseType: formData.enterpriseType || "",
        cinNumber: formData.cinNumber || "",
        aadhaarNumber: formData.aadhaarNumber || "",
        msmeNumber: formData.msmeNumber || "",
      });
    }
  }, [formData]);

  // Handler for text and number inputs to update local state
  const handleLocalUpdate = (field, value) => {
    setTaxData((prevState) => ({ ...prevState, [field]: value }));
  };

  // Handler for text and number inputs to update Redux on blur
  const handleReduxUpdate = () => {
    onUpdate(taxData);
  };

  // Handler for select menus to update Redux on change
  const handleSelectChange = (field, value) => {
    const updatedState = { ...taxData, [field]: value };
    setTaxData(updatedState);
    onUpdate(updatedState);
  };

  return (
    <CollapsibleSection
      isOpen={expandedSections.taxRegistration}
      onToggle={() => onToggleSection("taxRegistration")}
      icon={Shield}
      gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
      title="Tax & Registration Details"
      subtitle="Tax numbers and compliance information"
      fieldCount="8+ fields"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="GST Number" tooltip="Goods and Services Tax registration number">
              <CustomInput
                placeholder="e.g., 22AAAAA0000A1Z5"
                value={taxData.gstNumber}
                onChange={(e) => handleLocalUpdate("gstNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="PAN Number" tooltip="Permanent Account Number" >
              <CustomInput
                placeholder="e.g., ABCDE1234F"
                value={taxData.panNumber}
                onChange={(e) => handleLocalUpdate("panNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="VAT Number">
              <CustomInput
                placeholder="VAT registration number"
                value={taxData.vatNumber}
                onChange={(e) => handleLocalUpdate("vatNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="Service Tax">
              <CustomInput
                placeholder="Service tax number"
                value={taxData.serviceTax}
                onChange={(e) => handleLocalUpdate("serviceTax", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="CST Number">
              <CustomInput
                placeholder="Central Sales Tax number"
                value={taxData.cstNumber}
                onChange={(e) => handleLocalUpdate("cstNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="TAN Number">
              <CustomInput
                placeholder="Tax Deduction Account Number"
                value={taxData.tanNumber}
                onChange={(e) => handleLocalUpdate("tanNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="Credit Limit" tooltip="Maximum credit amount allowed">
              <CustomInput
                placeholder="0.00"
                value={taxData.creditLimit}
                onChange={(e) => handleLocalUpdate("creditLimit", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="Enterprise Type">
              <CustomAutocomplete
                placeholder="Select enterprise type"
                value={taxData.enterpriseType}
                onChange={(e, newValue) => handleSelectChange("enterpriseType", newValue)}
                options={[
                  { value: "micro", label: "Micro Enterprise" },
                  { value: "small", label: "Small Enterprise" },
                  { value: "medium", label: "Medium Enterprise" },
                  { value: "large", label: "Large Enterprise" },
                ]}
              />
            </FormField>
          </Grid>
        </Grid>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="CIN Number">
              <CustomInput
                placeholder="Corporate Identity Number"
                value={taxData.cinNumber}
                onChange={(e) => handleLocalUpdate("cinNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="Aadhaar Number">
              <CustomInput
                placeholder="12-digit Aadhaar number"
                value={taxData.aadhaarNumber}
                onChange={(e) => handleLocalUpdate("aadhaarNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <FormField label="MSME Number">
              <CustomInput
                placeholder="MSME registration number"
                value={taxData.msmeNumber}
                onChange={(e) => handleLocalUpdate("msmeNumber", e.target.value)}
                onBlur={handleReduxUpdate}
              />
            </FormField>
          </Grid>
        </Grid>
      </Box>
    </CollapsibleSection>
  );
};

export default TaxRegistrationSection;