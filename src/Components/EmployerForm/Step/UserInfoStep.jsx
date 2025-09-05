import React, { useEffect, useState } from 'react';
import { User, Users, TrendingUp } from 'lucide-react';
import { Box } from '@mui/material';
import { CollapsibleSection, FormField, OptionGrid } from "../../Ui";
import UserProfileForm from '../../CustomerForm/StepsComp/UserStep/UserProfileForm';
import UserAccountInfoSection from '../../CustomerForm/StepsComp/UserStep/AccountInformation';
import StaffFamilySection from '../StepsComp/UserStep/StaffFamilySection';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';

export default function UserInfoStep({
    expandedSections,
    onToggleSection,
    formData,
    errors,
    formType = "customer"
}) {
    const dispatch = useDispatch();
    const [localMaxTradeIn, setLocalMaxTradeIn] = useState(formData.maxTradeIn || []);

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step1",
            formData: data
        }));
    };

    // Max Trade In options
    const maxTradeInOptions = [
        { id: "gold", label: "Gold" },
        { id: "diamond", label: "Diamond" },
        { id: "colorStone", label: "Color Stone" },
        { id: "misc", label: "Misc" },
    ];

    const handleMaxTradeInChange = (option) => {
        setLocalMaxTradeIn((prevState) => {
            const prevSelections = prevState.maxTradeIn || [];

            let updatedSelections;
            if (prevSelections.includes(option)) {
                updatedSelections = prevSelections.filter(item => item !== option);
            } else {
                updatedSelections = [...prevSelections, option];
            }
            handleUpdate({ maxTradeIn: updatedSelections });
            return { ...prevState, maxTradeIn: updatedSelections };
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Account Info */}
            <CollapsibleSection
                isOpen={expandedSections.accountInfo}
                onToggle={() => onToggleSection('accountInfo')}
                icon={User}
                gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                title="Account Information"
                subtitle="Login credentials and basic account setup"
                fieldCount="6 fields"
            >
                <UserAccountInfoSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                    formType="employer"
                />
            </CollapsibleSection>

            {/* Personal Info */}
            <CollapsibleSection
                isOpen={expandedSections.personalInfo}
                onToggle={() => onToggleSection('personalInfo')}
                icon={User}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title="Personal Details"
                subtitle="Contact information and personal preferences"
                fieldCount="12+ fields"
            >
                <UserProfileForm
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>

            {/* Max Trade In - Only for Employer */}
            {formType === "employer" && (
                <CollapsibleSection
                    isOpen={expandedSections.maxTradeIn}
                    onToggle={() => onToggleSection('maxTradeIn')}
                    icon={TrendingUp}
                    gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                    title="Max Trade In"
                    subtitle="Select maximum trade-in categories allowed"
                    fieldCount="4 options"
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <FormField label="Trade-In Categories">
                            <OptionGrid
                                options={maxTradeInOptions}
                                selected={formData?.maxTradeIn}
                                onChange={(value) => handleMaxTradeInChange(value)}
                                size={{ xs: 12, sm: 6, md: 3 }}
                            />
                        </FormField>
                    </Box>
                </CollapsibleSection>
            )}

            {/* Staff/Family Info - Only for Employer */}
            {formType === "employer" && (
                <CollapsibleSection
                    isOpen={expandedSections.staffFamily}
                    onToggle={() => onToggleSection('staffFamily')}
                    icon={Users}
                    gradient="linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                    title="Staff & Family Information"
                    subtitle="Employee family details and emergency contacts"
                    fieldCount="8+ fields"
                >
                    <StaffFamilySection
                        formData={formData}
                        errors={errors}
                        onUpdate={handleUpdate}
                    />
                </CollapsibleSection>
            )}
        </div>
    );
}
