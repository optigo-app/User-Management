import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/supplierFormSlice';
import ShippingPackagesStep from '../../Common/ShippingPackagesStep/ShippingPackagesStep';

const SupplierPackagesStep = ({ expandedSections, onToggleSection, formData, error }) => {
    const dispatch = useDispatch();

    // Update supplier form step 5 (packages step)
    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step5",
            formData: data
        }));
    };

    return (
        <ShippingPackagesStep
            expandedSections={expandedSections}
            onToggleSection={onToggleSection}
            formData={formData}
            error={error}
            onUpdate={handleUpdate}
            formType="supplier"
            stepName="step5"
            sectionKey="shippingConfig"
            dataKey="shippingData"
        />
    );
};

export default SupplierPackagesStep;
