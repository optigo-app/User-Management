import React, { useState } from 'react';
import "./Style/shipping-step.scss";
import {
    Typography,
    Button,
    Box,
} from "@mui/material";
import {
    Truck,
    DollarSign,
    CheckCircle2,
    Plus,
} from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import ShippingAddressesList from '../StepsComp/ShipingStep/ShippingAddressesList';
import ShippingAddressForm from '../StepsComp/ShipingStep/ShippingAddressForm';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/customerFormSlice';
import CurrReginoal from '../StepsComp/ShipingStep/CurrReginoal';
import RegistrationComplete from '../StepsComp/ShipingStep/RegistrationComplete';

const ShippingStep = ({ expandedSections, onToggleSection, formData, error }) => {
    const dispatch = useDispatch();

    const [editingAddress, setEditingAddress] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    // This is the core dispatch function that updates the Redux store
    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step8",
            formData: data
        }));
    };

    const addNewAddress = () => {
        const newAddress = {
            id: Date.now().toString(),
            firstName: "",
            lastName: "",
            address: "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            mobile: "",
            isDefault: false,
            isLocked: false,
        };
        setEditingAddress(newAddress);
        setIsAddingNew(true);
    };

    const editAddress = (address) => {
        setEditingAddress(address);
        setIsAddingNew(false);
    };

    const saveAddress = (address) => {
        let updatedAddresses = [];

        if (address.isDefault) {
            updatedAddresses = (formData.shippingData || []).map((addr) => ({ ...addr, isDefault: false }));
        } else {
            updatedAddresses = [...(formData.shippingData || [])];
        }

        if (isAddingNew) {
            updatedAddresses = [...updatedAddresses, address];
        } else {
            updatedAddresses = updatedAddresses.map((addr) => (addr.id === address.id ? address : addr));
        }

        handleUpdate({
            ...formData,
            shippingData: updatedAddresses
        });

        setEditingAddress(null);
        setIsAddingNew(false);
    };

    const deleteAddress = (id) => {
        const updatedAddresses = (formData.shippingData || []).filter((addr) => addr.id !== id);
        handleUpdate({
            ...formData,
            shippingData: updatedAddresses
        });
    };

    const toggleLock = (id) => {
        const updatedAddresses = (formData.shippingData || []).map((addr) =>
            addr.id === id ? { ...addr, isLocked: !addr.isLocked } : addr
        );
        handleUpdate({
            ...formData,
            shippingData: updatedAddresses
        });
    };

    const setDefault = (id) => {
        const updatedAddresses = (formData.shippingData || []).map((addr) => ({ ...addr, isDefault: addr.id === id }));
        handleUpdate({
            ...formData,
            shippingData: updatedAddresses
        });
    };

    const printLabel = (address) => {
        console.log("Printing label for:", address);
        alert(`Printing shipping label for ${address.firstName} ${address.lastName}`);
    };

    const handleBlurSave = (updatedAddress) => {
        saveAddress(updatedAddress);
    };

    return (
        <div className='shipping-step'>
            <CollapsibleSection
                isOpen={expandedSections.shippingConfig}
                onToggle={() => onToggleSection("shippingConfig")}
                icon={Truck}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title="Shipping Configuration"
                subtitle="Multiple shipping addresses and delivery settings"
                fieldCount={`${(formData.shippingData || []).length} shipping addresses`}
            >
                <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Shipping Addresses</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={addNewAddress}
                        color="primary"
                    >
                        Add New Address
                    </Button>
                </Box>
                <ShippingAddressesList
                    addresses={formData.shippingData || []}
                    onEdit={editAddress}
                    onDelete={deleteAddress}
                    onToggleLock={toggleLock}
                    onPrint={printLabel}
                    onSetDefault={setDefault}
                />
                <ShippingAddressForm
                    address={editingAddress}
                    setAddress={setEditingAddress}
                    onSave={saveAddress}
                    onCancel={() => {
                        setEditingAddress(null);
                        setIsAddingNew(false);
                    }}
                    onBlur={handleBlurSave}
                    isAddingNew={isAddingNew}
                />
            </CollapsibleSection>

            <CollapsibleSection
                isOpen={expandedSections.termsPackages}
                onToggle={() => onToggleSection("termsPackages")}
                icon={DollarSign}
                gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                title="Currency & Regional Settings"
                subtitle="Currency preferences and regional configurations"
                fieldCount="5 fields"
            >
                <CurrReginoal
                    formData={formData.regionalData || {}}
                    onUpdate={(data) => handleUpdate({ ...formData, regionalData: data })}
                />
            </CollapsibleSection>

            <CollapsibleSection
                isOpen={expandedSections.brokerageConfig}
                onToggle={() => onToggleSection("brokerageConfig")}
                icon={CheckCircle2}
                gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                title="Ready to Complete"
                subtitle="Final review and completion summary"
                fieldCount="summary"
            >
                <RegistrationComplete shippingAddresses={formData.shippingData || []} />
            </CollapsibleSection>
        </div>
    );
};

export default ShippingStep;