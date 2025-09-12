import { Building2, User, CreditCard, FileText, Bell, Package, Truck } from "lucide-react";

export const manufacturerSteps = [
  {
    id: 1,
    title: "Company",
    description: "Company details and business information",
    icon: Building2,
    fields: ["Company Info", "Business Details", "Address", "Tax Registration"]
  },
  {
    id: 2,
    title: "User Info",
    description: "Personal details and account information",
    icon: User,
    fields: ["Personal Info", "Account Details", "Contact Information"]
  },
  {
    id: 3,
    title: "Banking",
    description: "Financial account details",
    icon: CreditCard,
    fields: ["Bank Accounts", "Payment Methods"]
  },
  {
    id: 4,
    title: "Documents",
    description: "Required and optional documents",
    icon: FileText,
    fields: ["Identity Docs", "Company Docs", "Certificates"]
  },
  {
    id: 5,
    title: "Notifications",
    description: "Communication preferences",
    icon: Bell,
    fields: ["Email", "SMS", "Push Notifications"]
  },
  {
    id: 6,
    title: "Package",
    description: "Manufacturing packages and pricing",
    icon: Package,
    fields: ["Manufacturing Plans", "Pricing", "Terms & Conditions"]
  },
  {
    id: 7,
    title: "Shipping",
    description: "Shipping address information",
    icon: Truck,
    fields: ["Shipping Address"]
  }
];
