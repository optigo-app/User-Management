import React from "react";
import { useDispatch } from "react-redux";
import { updateStepData } from "../../../Redux/customerFormSlice";
import { Package, DollarSign, User } from "lucide-react";
import "./Style/PackagesStep.scss";
import { CollapsibleSection } from "../../Ui";
import PricePolicyComponent from "../StepsComp/PackageStep/PricePolicyComponent";
import TearmsPackage from "../StepsComp/PackageStep/TearmsPackage";
import BrokerageComp from "../StepsComp/PackageStep/BrokrageComp";

export default function PackagesStep({ expandedSections, onToggleSection, formData, errors }) {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step7",
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
                title="Price Policy"
                subtitle="Pricing structure and discount configuration"
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
                title="Terms & Packages"
                subtitle="E-catalog access and policy terms"
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
                title="Brokerage Configuration"
                subtitle="Commission and brokerage terms"
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