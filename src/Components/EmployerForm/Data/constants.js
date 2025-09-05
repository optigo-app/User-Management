import { User, CreditCard, Settings, FileText, Bell, Shield, Lock, Package } from "lucide-react";

export const employerSteps = [
  {
    id: 1,
    title: "User Info",
    description: "Personal details, ID card, and family info",
    icon: User,
    fields: ["Personal Info", "Account Details", "ID Card", "Family Details"]
  },
  {
    id: 2,
    title: "Banking",
    description: "Financial account details",
    icon: CreditCard,
    fields: ["Bank Accounts", "Payment Methods"]
  },
  {
    id: 3,
    title: "Preferences",
    description: "System preferences and settings",
    icon: Settings,
    fields: ["Display", "Notifications", "Regional"]
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
    title: "Package Info",
    description: "Payroll packages and compensation details",
    icon: Package,
    fields: ["Salary Package", "Benefits", "Payroll Settings"]
  },
  {
    id: 7,
    title: "App Rights",
    description: "Application access and system permissions",
    icon: Shield,
    fields: ["Module Access", "System Features", "Time Restrictions"]
  },
  {
    id: 8,
    title: "User Permissions",
    description: "Role assignment and permission matrix",
    icon: Lock,
    fields: ["Role Assignment", "Permission Matrix", "Hierarchy"]
  }
];
