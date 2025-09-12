import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStepData } from "../../../Redux/manufacturerFormSlice";
import ShippingPackagesStep from "../../Common/ShippingPackagesStep/ShippingPackagesStep";

const ShippingStep = () => {
  const dispatch = useDispatch();
  const stepData = useSelector((state) => state.manufacturerForm.data.step7 || {});

  const handleUpdate = (data) => {
    dispatch(updateStepData({ stepName: "step7", formData: data }));
  };

  return (
    <ShippingPackagesStep
      expandedSections={{ shippingConfig: true }}
      onToggleSection={() => {}}
      formData={stepData}
      onUpdate={handleUpdate}
      formType="manufacturer"
      stepName="step7"
      sectionKey="shippingConfig"
      dataKey="addresses"
    />
  );
};

export default ShippingStep;
