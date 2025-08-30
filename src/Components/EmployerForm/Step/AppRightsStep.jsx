import React from 'react';
import { Box } from "@mui/material";
import { Shield, Settings, CreditCard } from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';
import AppRightsSection from '../StepsComp/AppRights/AppRightsSection';
import SystemAccessSection from '../StepsComp/AppRights/SystemAccessSection';
import IdCardSection from '../StepsComp/AppRights/IdCardSection';

const AppRightsStep = ({ expandedSections, onToggleSection, formData, errors }) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step6",
            formData: data
        }));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CollapsibleSection
                title="Application Rights"
                subtitle="Define user access to different application modules"
                isOpen={expandedSections.appRights}
                onToggle={() => onToggleSection("appRights")}
                icon={Shield}
                gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                fieldCount="Multiple modules"
            >
                <AppRightsSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>

            <CollapsibleSection
                title="System Access"
                subtitle="Configure system-level permissions and restrictions"
                isOpen={expandedSections.systemAccess}
                onToggle={() => onToggleSection("systemAccess")}
                icon={Settings}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                fieldCount="Access controls"
            >
                <SystemAccessSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>

            <CollapsibleSection
                title="ID Card Information"
                subtitle="Configure employee ID card details and generate card"
                isOpen={expandedSections.idCard}
                onToggle={() => onToggleSection("idCard")}
                icon={CreditCard}
                gradient="linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
                fieldCount="Card details"
            >
                <IdCardSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>
        </Box>
    );
};

export default AppRightsStep;
