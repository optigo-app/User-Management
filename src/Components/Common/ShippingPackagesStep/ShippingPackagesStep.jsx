import React, { useState } from 'react';
import {
    Typography,
    Button,
    Box,
} from "@mui/material";
import {
    Truck,
    Plus,
} from "lucide-react";
import { CollapsibleSection } from '../../Ui';
import ShippingAddressesList from '../../CustomerForm/StepsComp/ShipingStep/ShippingAddressesList';
import ShippingAddressForm from '../../CustomerForm/StepsComp/ShipingStep/ShippingAddressForm';
import "../../CustomerForm/Step/Style/shipping-step.scss";

const ShippingPackagesStep = ({ 
    expandedSections, 
    onToggleSection, 
    formData, 
    error, 
    onUpdate,
    formType = "supplier",
    stepName = "step5",
    sectionKey = "shippingConfig",
    dataKey = "shippingData"
}) => {
    const [editingAddress, setEditingAddress] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Generic update handler
    const handleUpdate = (data) => {
        onUpdate(data);
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
            countryCode: "+1",
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
            updatedAddresses = (formData[dataKey] || []).map((addr) => ({ ...addr, isDefault: false }));
        } else {
            updatedAddresses = [...(formData[dataKey] || [])];
        }

        if (isAddingNew) {
            updatedAddresses = [...updatedAddresses, address];
        } else {
            updatedAddresses = updatedAddresses.map((addr) => (addr.id === address.id ? address : addr));
        }

        handleUpdate({
            ...formData,
            [dataKey]: updatedAddresses
        });

        setEditingAddress(null);
        setIsAddingNew(false);
    };

    const deleteAddress = (id) => {
        const updatedAddresses = (formData[dataKey] || []).filter((addr) => addr.id !== id);
        handleUpdate({
            ...formData,
            [dataKey]: updatedAddresses
        });
    };

    const toggleLock = (id) => {
        const updatedAddresses = (formData[dataKey] || []).map((addr) =>
            addr.id === id ? { ...addr, isLocked: !addr.isLocked } : addr
        );
        handleUpdate({
            ...formData,
            [dataKey]: updatedAddresses
        });
    };

    const setDefault = (id) => {
        const updatedAddresses = (formData[dataKey] || []).map((addr) => ({ ...addr, isDefault: addr.id === id }));
        handleUpdate({
            ...formData,
            [dataKey]: updatedAddresses
        });
    };

    const printLabel = (address) => {
        console.log("Printing label for:", address);
        alert(`Printing shipping label for ${address.firstName} ${address.lastName}`);
    };

    const handleBlurSave = (updatedAddress) => {
        saveAddress(updatedAddress);
    };

    // Configuration based on form type
    const getConfig = () => {
        if (formType === "manufacturer") {
            return {
                title: "Shipping Address",
                subtitle: "Add shipping addresses for your manufacturing operations",
                showCollapsible: true,
                showLock: false,
                showPrint: false
            };
        }
        return {
            title: "Shipping Configuration",
            subtitle: "Multiple shipping addresses and delivery settings",
            showCollapsible: true,
            showLock: true,
            showPrint: true
        };
    };

    const config = getConfig();

    const renderContent = () => (
        <>
            <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Shipping Addresses</Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={addNewAddress}
                    color="primary"
                    disabled={editingAddress !== null}
                >
                    {formType === "manufacturer" ? "Add Address" : "Add New Address"}
                </Button>
            </Box>
            <ShippingAddressesList
                addresses={formData[dataKey] || []}
                onEdit={editAddress}
                onDelete={deleteAddress}
                onToggleLock={config.showLock ? toggleLock : undefined}
                onPrint={config.showPrint ? printLabel : undefined}
                onSetDefault={setDefault}
                editingAddress={editingAddress}
            />
            {editingAddress && (
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
            )}
        </>
    );

    // Collapsible layout for both supplier and manufacturer
    return (
        <div className='shipping-step'>
            <CollapsibleSection
                isOpen={expandedSections[sectionKey]}
                onToggle={() => onToggleSection(sectionKey)}
                icon={Truck}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title={config.title}
                subtitle={config.subtitle}
                fieldCount={`${(formData[dataKey] || []).length} shipping addresses`}
            >
                {renderContent()}
            </CollapsibleSection>
        </div>
    );
};

export default ShippingPackagesStep;
