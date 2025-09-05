import React from 'react';
import { User } from 'lucide-react';
import { CollapsibleSection } from "../../Ui";
import UserProfileForm from '../StepsComp/UserStep/UserProfileForm';
import UserAccountInfoSection from '../StepsComp/UserStep/AccountInformation';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/customerFormSlice';

export default function UserInfoStep({
    expandedSections,
    onToggleSection,
    formData,
    errors,
}) {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step2",
            formData: data
        }));
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
                fieldCount="4 fields"
            >

                <UserAccountInfoSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                    formType="customer"
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
        </div>
    );
}