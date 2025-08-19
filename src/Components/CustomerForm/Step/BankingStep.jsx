import React from 'react';
import { Box } from "@mui/material";
import { CreditCard } from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/customerFormSlice';
import BankingComp from '../StepsComp/BankingStep/BannkingComp';

const BankingStep = ({ expandedSections, onToggleSection, formData, errors }) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step3",
            formData: data
        }));
    };

    const accounts = formData?.bankAccounts || [];
    const fieldCountText = `${accounts?.length || 0} account${accounts?.length !== 1 ? 's' : ''}`;


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CollapsibleSection
                title="Banking Information"
                subtitle="Secure financial account details"
                expanded={expandedSections.bankingInfo}
                isOpen={expandedSections.bankingInfo}
                onToggle={() => onToggleSection("bankingInfo")}
                icon={CreditCard}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                fieldCount={fieldCountText}
            >
                <BankingComp
                    formData={accounts}
                    errors={errors}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>
        </Box>
    );
};

export default BankingStep;