import React from 'react';
import { Box } from "@mui/material";
import { Users, Lock } from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';
import UserPermissionsSection from '../StepsComp/UserPermissions/UserPermissionsSection';
import RoleManagementSection from '../StepsComp/UserPermissions/RoleManagementSection';

const UserPermissionsStep = ({ expandedSections, onToggleSection, formData, errors }) => {
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
                title="User Permissions"
                subtitle="Configure specific user permissions and access controls"
                isOpen={expandedSections.userPermissions}
                onToggle={() => onToggleSection("userPermissions")}
                icon={Lock}
                gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                fieldCount="Permission matrix"
            >
                <UserPermissionsSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>

            <CollapsibleSection
                title="Role Management"
                subtitle="Assign and manage user roles and hierarchies"
                isOpen={expandedSections.roleManagement}
                onToggle={() => onToggleSection("roleManagement")}
                icon={Users}
                gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
                fieldCount="Role assignments"
            >
                <RoleManagementSection
                    formData={formData}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>
        </Box>
    );
};

export default UserPermissionsStep;
