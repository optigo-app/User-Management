import React from "react";
import { useDispatch } from "react-redux";
import { updateStepData } from "../../../Redux/manufacturerFormSlice";
import { Package, DollarSign, User } from "lucide-react";
import "../../CustomerForm/Step/Style/PackagesStep.scss";
import { CollapsibleSection } from "../../Ui";
import PricePolicyComponent from "../../CustomerForm/StepsComp/PackageStep/PricePolicyComponent";
import TearmsPackage from "../../CustomerForm/StepsComp/PackageStep/TearmsPackage";
import BrokerageComp from "../../CustomerForm/StepsComp/PackageStep/BrokrageComp";

export default function PackagesStep({ expandedSections, onToggleSection, formData, errors }) {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step6",
            formData: data
        }));
    };

    return (
        <div className="packages-step">

            {/* Price Policy */}
            <CollapsibleSection
                isOpen={expandedSections.pricePolicy}
                onToggle={() => onToggleSection("pricePolicy")}
                icon={DollarSign}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title="Manufacturing Price Policy"
                subtitle="Manufacturing pricing structure and discount configuration"
                fieldCount="7 fields"
            >
                <PricePolicyComponent
                    formData={formData.pricePolicy || {}}
                    errors={errors.pricePolicy || {}}
                    onUpdate={(data) => handleUpdate({ pricePolicy: data })}
                />
            </CollapsibleSection>

            {/* Terms & Packages */}
            <CollapsibleSection
                isOpen={expandedSections.termsPackages}
                onToggle={() => onToggleSection("termsPackages")}
                icon={Package}
                gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                title="Manufacturing Terms & Packages"
                subtitle="Manufacturing catalog access and policy terms"
                fieldCount="3 fields"
            >
                <TearmsPackage
                    formData={formData.termsPackages || {}}
                    errors={errors.termsPackages || {}}
                    onUpdate={(data) => handleUpdate({ termsPackages: data })}
                />
            </CollapsibleSection>

            {/* Brokerage Configuration */}
            <CollapsibleSection
                isOpen={expandedSections.brokerageConfig}
                onToggle={() => onToggleSection("brokerageConfig")}
                icon={User}
                gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                title="Manufacturing Commission"
                subtitle="Manufacturing commission and partnership terms"
                fieldCount="3 sections"
            >
                <BrokerageComp
                    formData={formData.brokerageConfig || {}}
                    errors={errors.brokerageConfig || {}}
                    onUpdate={(data) => handleUpdate({ brokerageConfig: data })}
                />
            </CollapsibleSection>
        </div>
    );
}
