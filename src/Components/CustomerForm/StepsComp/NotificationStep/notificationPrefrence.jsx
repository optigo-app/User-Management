import React, { memo } from 'react'
import { CollapsibleSection } from '../../../Ui'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Bell } from 'lucide-react'

const NotificationPrefrence = ({ expandedSections, onToggleSection, notificationPreferences, handlePreferenceChange }) => {

    return (
        <div>
            <CollapsibleSection
                isOpen={expandedSections.notificationPreferences}
                onToggle={() => onToggleSection("notificationPreferences")}
                icon={Bell}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                title="Notification Preferences"
                subtitle="Configure notification types and settings"
                fieldCount="4 types"
            >
                <Box>
                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
                        {[
                            { id: "orderUpdates", label: "Order Updates", description: "Status changes, shipping updates" },
                            { id: "paymentAlerts", label: "Payment Alerts", description: "Payment confirmations, due dates" },
                            { id: "promotions", label: "Promotions", description: "Special offers, discounts" },
                            { id: "newsletters", label: "Newsletters", description: "Company news, product updates" },
                        ].map((pref) => (
                            <Box key={pref.id} display="flex" alignItems="flex-start" p={1} border="1px solid #ddd" borderRadius={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!notificationPreferences[pref.id]}
                                            onChange={() => handlePreferenceChange(pref.id)}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography variant="body2" fontWeight="500">
                                                {pref.label}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {pref.description}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </CollapsibleSection>
        </div>
    )
}

export default memo(NotificationPrefrence)