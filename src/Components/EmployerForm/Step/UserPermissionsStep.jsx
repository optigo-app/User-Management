import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';
import { DollarSign, Shield, CreditCard, MapPin, Zap, FileCheck } from 'lucide-react';
import {
    PettyCashBankComponent,
    ATMBindingComponent,
    FGStockAccessComponent,
    StockAccessComponent,
    MFGAccessComponent,
    MFGLocationComponent,
    QuickAccessComponent,
    AccessPermissionComponent,
    QCPermissionComponent
} from '../StepsComp/UserPermissions';
import { CollapsibleSection } from '../../Ui';

const UserPermissionsStep = ({ expandedSections, onToggleSection, formData, errors }) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step7",
            formData: data
        }));
    };

    const handlePermissionChange = (permissionKey, value) => {
        if (permissionKey === 'bankingPer') {
            handleUpdate({
                ...formData,
                bankingPer: value
            });
        } else if (permissionKey === 'atmBinding') {
            handleUpdate({
                ...formData,
                atmBinding: value
            });
        } else if (permissionKey === 'fgStockAccess') {
            handleUpdate({
                ...formData,
                fgStockAccess: value
            })
        } else if (permissionKey === "stockAccess") {
            handleUpdate({
                ...formData,
                stockAccess: value
            })
        } else if (permissionKey === "mfgAccess") {
            handleUpdate({
                ...formData,
                mfgAccess: value
            })
        } else if (permissionKey === "mfgLocation") {
            handleUpdate({
                ...formData,
                mfgLocation: value
            })
        } else if (permissionKey === "accessPermission") {
            handleUpdate({
                ...formData,
                accessPermission: value
            })
        } else if (permissionKey === "qcPermission") {
            handleUpdate({
                ...formData,
                qcPermission: value
            })
        } else if (permissionKey === "quickAccess") {
            handleUpdate({
                ...formData,
                quickAccess: value
            })
        } else {
            const updatedPermissions = {
                ...formData?.userPermissions,
                [permissionKey]: value
            };

            handleUpdate({
                ...formData,
                userPermissions: updatedPermissions
            });
        }
    };

    const permissionSections = [
        {
            title: "Petty Cash/Bank",
            icon: DollarSign,
            color: "#f59e0b",
            sectionKey: "pettyCashBank",
            subtitle: "Manage petty cash and banking operations",
            component: PettyCashBankComponent
        },
        {
            title: "ATM Binding",
            icon: CreditCard,
            color: "#3b82f6",
            sectionKey: "atmBinding",
            subtitle: "Configure ATM binding permissions",
            component: ATMBindingComponent
        },
        {
            title: "FG Stock Access",
            icon: Shield,
            color: "#10b981",
            sectionKey: "fgStockAccess",
            subtitle: "Finished goods stock access control",
            component: FGStockAccessComponent
        },
        {
            title: "Stock Access",
            icon: Shield,
            color: "#8b5cf6",
            sectionKey: "stockAccess",
            subtitle: "General stock access permissions",
            component: StockAccessComponent
        },
        {
            title: "MFG Access",
            icon: Shield,
            color: "#ef4444",
            sectionKey: "mfgAccess",
            subtitle: "Manufacturing access control",
            component: MFGAccessComponent
        },
        {
            title: "MFG Location",
            icon: MapPin,
            color: "#06b6d4",
            sectionKey: "mfgLocation",
            subtitle: "Manufacturing location permissions",
            component: MFGLocationComponent
        },
        {
            title: "Quick Access",
            icon: Zap,
            color: "#f59e0b",
            sectionKey: "quickAccess",
            subtitle: "Quick access shortcuts and permissions",
            component: QuickAccessComponent
        },
        {
            title: "Access Permission",
            icon: Shield,
            color: "#84cc16",
            sectionKey: "accessPermission",
            subtitle: "General access permission controls",
            component: AccessPermissionComponent
        },
        {
            title: "QC Permission",
            icon: FileCheck,
            color: "#ec4899",
            sectionKey: "qcPermission",
            subtitle: "Quality control permission settings",
            component: QCPermissionComponent
        }
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {permissionSections.map((section, index) => {
                const ComponentToRender = section.component;
                const hasAnyPermission = section.sectionKey === 'pettyCashBank'
                    ? (Object.keys(formData?.bankingPer?.location || {}).some(key => formData.bankingPer.location[key]) ||
                        Object.keys(formData?.bankingPer?.access || {}).some(key => formData.bankingPer.access[key]))
                    : section.sectionKey === 'atmBinding'
                        ? (Object.keys(formData?.atmBinding?.users || {}).some(key => formData.atmBinding.users[key]) ||
                            Object.keys(formData?.atmBinding?.access || {}).some(key => formData.atmBinding.access[key]))
                        : formData?.userPermissions?.[section.sectionKey] || false;

                return (
                    <CollapsibleSection
                        key={index}
                        title={section.title}
                        subtitle={section.subtitle}
                        isOpen={expandedSections[section.sectionKey] || false}
                        onToggle={() => onToggleSection(section.sectionKey)}
                        icon={section.icon}
                        gradient={`linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`}
                        fieldCount={hasAnyPermission ? "Enabled" : "Disabled"}
                    >
                        <ComponentToRender
                            formData={formData}
                            onPermissionChange={handlePermissionChange}
                            color={section.color}
                        />
                    </CollapsibleSection>
                );
            })}
        </Box>
    );
};

export default UserPermissionsStep;
