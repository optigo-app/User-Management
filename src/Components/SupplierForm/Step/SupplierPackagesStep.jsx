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
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/supplierFormSlice';
import "../../CustomerForm/Step/Style/shipping-step.scss";

const SupplierPackagesStep = ({ expandedSections, onToggleSection, formData, error }) => {
    const dispatch = useDispatch();

    const [editingAddress, setEditingAddress] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Update supplier form step 5 (packages step)
    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step5",
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
        </div>
    );
};

export default SupplierPackagesStep;
