import React from "react";
import { Box } from "@mui/material";
import { Building2 } from "lucide-react";
import { CollapsibleSection } from "../../Ui";
import CompanySelection from "../../CustomerForm/StepsComp/CompanyStep/ComapnySelection";
import ExistingCompanySelector from "../../CustomerForm/StepsComp/CompanyStep/ExistingCompanySelector";
import BasicCompanyInfoSection from "../../CustomerForm/StepsComp/CompanyStep/BasicCompanyInfoSection";
import CompanyAddressSection from "../../CustomerForm/StepsComp/CompanyStep/CompanyAddressSection";
import TaxRegistrationSection from "../../CustomerForm/StepsComp/CompanyStep/TaxRegistrationSection";
import { useDispatch } from "react-redux";
import { updateStepData } from "../../../Redux/manufacturerFormSlice";

const CompanyStep = ({ expandedSections, onToggleSection, formData, errors }) => {
    const dispatch = useDispatch();
    const businessType = formData.businessType || "new";

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step1",
            formData: data
        }));
    };

    const handleCompanyTypeChange = (type) => {
        dispatch(updateStepData({
            stepName: "step1",
            formData: { businessType: type }
        }));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CollapsibleSection
                isOpen={expandedSections.companySelection}
                onToggle={() => onToggleSection("companySelection")}
                icon={Building2}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                title="Company Selection"
                subtitle="Choose existing or create new company"
                fieldCount="2 options"
            >
                <CompanySelection 
                    businessType={businessType} 
                    onCompanyTypeChange={handleCompanyTypeChange} 
                />
                {businessType === "existing" && <ExistingCompanySelector />}
            </CollapsibleSection>

            {businessType === "new" && (
                <>
                    <BasicCompanyInfoSection
                        expandedSections={expandedSections}
                        onToggleSection={onToggleSection}
                        formData={formData}
                        errors={errors}
                        onUpdate={handleUpdate}
                    />

                    <CompanyAddressSection
                        expandedSections={expandedSections}
                        onToggleSection={onToggleSection}
                        formData={formData} 
                        errors={errors}
                        onUpdate={handleUpdate}

                    />

                    <TaxRegistrationSection
                        expandedSections={expandedSections}
                        onToggleSection={onToggleSection}
                        formData={formData} 
                        errors={errors}
                        onUpdate={handleUpdate}

                    />
                </>
            )}
        </Box>
    );
};

export default CompanyStep;
