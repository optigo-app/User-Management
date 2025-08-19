export const formatCustomer = (customer = {}) => {
    return {
        step1: {
            companyName: customer.company || "",
            businessType: customer.companyType || "",
            enterpriseType: customer.enterpriseType || "",
            gstNumber: customer.gstNumber || "",
            panNumber: customer.panNumber || "",
            tanNumber: customer.tanNumber || "",
            aadhaarNumber: customer.aadhaarNumber || "",
            cinNumber: customer.cinNumber || "",
            msmeNumber: customer.msmeNumber || "",
            vatNumber: customer.vatNumber || "",
            cstNumber: customer.cstNumber || "",
            serviceTax: customer.serviceTax || "",
            taxScheme: customer.taxScheme || "",
            taxType: customer.taxType || "",
            addressLine1: customer.addressLine1 || "",
            addressLine2: customer.addressLine2 || "",
            area: customer.area || "",
            city: customer.city || "",
            state: customer.state || "",
            postalCode: customer.postalCode || "",
            country: customer.country || "",
            telephone: customer.telephone || "",
            mobile: customer.mobile || "",
            creditLimit: customer.creditLimit || 0,
        },
        step2: {
            userCode: customer.userCode || "",
            firstName: customer.firstName || "",
            middleName: customer.middleName || "",
            lastName: customer.lastName || "",
            dateOfBirth: customer.dateOfBirth || "",
            maritalStatus: customer.maritalStatus || "",
            religion: customer.religion || "",
            profession: customer.profession || "",
            festivalPreference: customer.festivalPreference || "",
            assignedBroker: customer.assignedBroker || "",
            joiningDate: customer.joiningDate || "",
            referenceBy: customer.referenceBy || "",
            referenceUserCode: customer.referenceUserCode || "",
            countryCode: customer.countryCode || "",
            mobileNumber: customer.mobileNumber || "",
            telephone: customer.telephone || "",
            userEmail: customer.userEmail || "",
            city: customer.city || "",
            state: customer.state || "",
            country: customer.country || "",
            area: customer.area || "",
            zipCode: customer.zipCode || "",
            profilePhoto: customer.profilePhoto || "",
        },
        step3: {
            bankAccounts: customer.bankAccounts?.map((acc) => ({
                bankName: acc.bankName || "",
                branchName: acc.branchName || "",
                holderName: acc.holderName || "",
                accountType: acc.accountType || "",
                accountNumber: acc.accountNumber || "",
                ifscCode: acc.ifscCode || "",
                isPrimary: acc.isPrimary || false,
            })) || [],
        },
        step4: {
            shippingMethod: customer.shippingMethod || "",
            preferredCertification: customer.preferredCertification || "",
            selectedCertifications: customer.selectedCertifications || [],
            userInstructions: customer.userInstructions || "",
            adminInstructions: customer.adminInstructions || "",
            officeInstructions: customer.officeInstructions || "",
            customerInstructions: customer.customerInstructions || "",
            otherInstructions: customer.otherInstructions || "",
        },
        step5: {
            bankName: customer.bankName || "",
            bankAccount: customer.bankAccount || "",
        },
        step6: {
            emailAlerts: customer.emailAlerts || [],
            mobileAlerts: customer.mobileAlerts?.map(alert => ({
                countryCode: alert.countryCode || "",
                mobileNo: alert.mobileNo || "",
            })) || [],
            notificationPreferences: {
                orderUpdates: customer.notificationPreferences?.orderUpdates || false,
                promotions: customer.notificationPreferences?.promotions || false,
                newsletters: customer.notificationPreferences?.newsletters || false,
                paymentAlerts: customer.notificationPreferences?.paymentAlerts || false,
            },
        },
        step7: {
            pricePolicy: {
                diamondPrice: customer.pricePolicy?.diamondPrice || "",
                colorStonePrice: customer.pricePolicy?.colorStonePrice || "",
                labourCharges: customer.pricePolicy?.labourCharges || "",
                settingCharges: customer.pricePolicy?.settingCharges || "",
                excludePremium: customer.pricePolicy?.excludePremium || false,
            },
            termsPackages: {
                eCatalogPackage: customer.termsPackages?.eCatalogPackage || "",
                adhocAccess: customer.termsPackages?.adhocAccess || "",
                policyDuration: customer.termsPackages?.policyDuration || "",
            },
            brokerageConfig: {
                commissionApplicableOn: customer.brokerageConfig?.commissionApplicableOn || [],
                commissionStructure: customer.brokerageConfig?.commissionStructure || "",
                assignBroker: customer.brokerageConfig?.assignBroker || "",
                fixedAmount: customer.brokerageConfig?.fixedAmount || "",
                percentageRate: customer.brokerageConfig?.percentageRate || "",
            }
        },
        step8: {
            shippingData: customer.shippingData?.map((addr) => ({
                id: addr.id || "",
                fullName: `${addr.firstName || ""} ${addr.lastName || ""}`.trim(),
                address: [
                    addr.address,
                    addr.city,
                    addr.state,
                    addr.country,
                    addr.zipCode
                ].filter(Boolean).join(", "),
                mobile: addr.mobile || "",
                area: addr.area || "",
                isDefault: addr.isDefault || false,
                isLocked: addr.isLocked || false
            })) || [],
            regionalData: {
                primaryCurrency: customer.regionalData?.primaryCurrency || "usd",
                secondaryCurrency: customer.regionalData?.secondaryCurrency || "none",
                dateFormat: customer.regionalData?.dateFormat || "mm/dd/yyyy",
                timeZone: customer.regionalData?.timeZone || "est"
            }
        }
    };
};
