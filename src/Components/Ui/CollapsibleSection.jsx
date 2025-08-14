import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "./Badge";

export const CollapsibleSection = ({ isOpen, onToggle, icon, gradient, title, subtitle, fieldCount, children }) => {
    return (
        <div style={{
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: 'white',
            transition: 'all 0.2s',
            boxShadow: isOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
        }}>
            <div
                onClick={onToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.parentElement.style.borderColor = 'rgba(115, 103, 240, 0.3)';
                    e.currentTarget.parentElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) {
                        e.currentTarget.parentElement.style.borderColor = '#e5e7eb';
                        e.currentTarget.parentElement.style.boxShadow = 'none';
                    }
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        padding: '12px',
                        borderRadius: '12px',
                        background: gradient,
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}>
                        {React.createElement(icon, { size: 24, color: 'white' })}
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: 0,
                            transition: 'color 0.2s'
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: '4px 0 0 0'
                        }}>
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge variant="outline">{fieldCount}</Badge>
                    {isOpen ? (
                        <ChevronDown size={20} color="#9ca3af" />
                    ) : (
                        <ChevronRight size={20} color="#9ca3af" />
                    )}
                </div>
            </div>
            {isOpen && (
                <div style={{ padding: '0 24px 24px 24px' }}>
                    <div style={{ paddingTop: '24px' }}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}
