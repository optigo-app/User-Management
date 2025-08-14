import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { FormField, Select } from  "../../../Ui";

export default function ExistingCompanySelector() {
    return (
        <Card>
            <CardHeader title="Select Existing Company" />
            <CardContent>
                <FormField label="Company" required>
                    <Select
                        placeholder="Search and select company..."
                        options={[
                            {
                                value: "company1",
                                label: "ABC Jewelers Ltd. — GST: 123456789 • New York",
                            },
                            {
                                value: "company2",
                                label: "XYZ Diamonds Inc. — GST: 987654321 • California",
                            },
                        ]}
                    />
                </FormField>
            </CardContent>
        </Card>
    );
}
