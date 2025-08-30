import React from 'react';
import { User, IdCard, Users } from 'lucide-react';
import { CollapsibleSection } from "../../Ui";
import UserProfileForm from '../../CustomerForm/StepsComp/UserStep/UserProfileForm';
import UserAccountInfoSection from '../../CustomerForm/StepsComp/UserStep/AccountInformation';
import IdCardSection from '../StepsComp/UserStep/IdCardSection';
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

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step1",
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

            {/* ID Card Info - Only for Employer */}
            {formType === "employer" && (
                <CollapsibleSection
                    isOpen={expandedSections.idCardInfo}
                    onToggle={() => onToggleSection('idCardInfo')}
                    icon={IdCard}
                    gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                    title="ID Card Information"
                    subtitle="Employee identification and card details"
                    fieldCount="6 fields"
                >
                    <IdCardSection
                        formData={formData}
                        errors={errors}
                        onUpdate={handleUpdate}
                    />
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
