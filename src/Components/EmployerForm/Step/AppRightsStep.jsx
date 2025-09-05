import React from 'react';
import { Box } from "@mui/material";
import { Shield } from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';
import AppRightsSection from '../StepsComp/AppRights/AppRightsSection';

const AppRightsStep = ({ expandedSections, onToggleSection, formData, errors }) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step7",
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
        </Box>
    );
};

export default AppRightsStep;
