import React, { useRef } from 'react';
import "./IdCard.scss";
import { Box, Dialog, DialogContent, IconButton, Button, DialogActions } from '@mui/material';
import { X, QrCode, Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import IdCard from './IdCard';
import toast from 'react-hot-toast';

const staticEmployeeData = [
    { name: "John Doe", employeeId: "E1185", position: "ACCOUNT EXECUTIVE", joiningDate: "19 JUL 2025", company: "Classmate Corporation Pvt Ltd", address: "G20, Ground floor, ITC building, Surat -999077,Gujarat(India)", website: "WWW.OPTIGO.COM", phone: "T:+91-261-4890777", avatar: null },
    { name: "Jane Smith", employeeId: "E1186", position: "HR MANAGER", joiningDate: "10 JAN 2024", company: "Classmate Corporation Pvt Ltd", address: "G20, Ground floor, ITC building, Surat -999077,Gujarat(India)", website: "WWW.OPTIGO.COM", phone: "T:+91-261-4890888", avatar: null },
    { name: "Robert Johnson", employeeId: "E1187", position: "SOFTWARE ENGINEER", joiningDate: "05 MAR 2025", company: "Classmate Corporation Pvt Ltd", address: "G20, Ground floor, ITC building, Surat -999077,Gujarat(India)", website: "WWW.OPTIGO.COM", phone: "T:+91-261-4890999", avatar: null }
];

const IdCardPreview = ({ open, onClose, selectedRowsData }) => {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Employee ID Cards',
        onAfterPrint: () => {
            console.log('Print completed');
        },
        onPrintError: (error) => {
            console.error('Print error:', error);
        }
    });

    const handleDownload = async () => {
        try {
            if (!printRef.current) {
                toast.error('No content to download');
                return;
            }
            toast.loading('Generating individual card images...');
            const zip = new JSZip();
            const cardElements = printRef.current.querySelectorAll('.id-card');
            for (let i = 0; i < cardElements.length; i++) {
                const cardElement = cardElements[i];
                const employeeData = staticEmployeeData[i];
                const tempContainer = document.createElement('div');
                tempContainer.style.padding = '20px';
                tempContainer.style.backgroundColor = '#ffffff';
                tempContainer.style.display = 'inline-block';
                const cardClone = cardElement.cloneNode(true);
                tempContainer.appendChild(cardClone);
                document.body.appendChild(tempContainer);
                const canvas = await html2canvas(tempContainer, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: tempContainer.scrollWidth,
                    height: tempContainer.scrollHeight
                });
                document.body.removeChild(tempContainer);
                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/png');
                });
                const fileName = `${employeeData.name.replace(/\s+/g, '_')}_${employeeData.employeeId}.png`;
                zip.file(fileName, blob);
            }
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipFileName = `Employee_ID_Cards_${new Date().toISOString().split('T')[0]}.zip`;
            saveAs(zipBlob, zipFileName);
            toast.dismiss();
            toast.success(`${cardElements.length} ID Cards downloaded successfully!`);
        } catch (error) {
            console.error('Download error:', error);
            toast.dismiss();
            toast.error('Failed to download ID cards');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{ sx: { borderRadius: '16px', background: '#ffffff' } }}
        >
            <Box sx={{ position: 'relative' }}>
                {/* Top Action Bar */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid #e2e8f0',
                    bgcolor: '#f8fafc'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<QrCode size={16} />}
                            onClick={() => handlePrint()}
                            sx={{ minWidth: 120 }}
                        >
                            Print All
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Download size={16} />}
                            onClick={handleDownload}
                            sx={{ minWidth: 120 }}
                        >
                            Download
                        </Button>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': { background: 'rgba(255, 255, 255, 1)' }
                            }}
                        >
                            <X size={20} />
                        </IconButton>
                    </Box>
                </Box>

                <DialogContent sx={{ padding: 2 }}>
                    <Box
                        ref={printRef}
                        className="id-card-container-print"
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
                    >
                        {staticEmployeeData.map((employee, idx) => (
                            <IdCard
                                key={employee.employeeId || idx}
                                employeeData={employee}
                            />
                        ))}
                    </Box>
                </DialogContent>

                {/* Footer with Close Button */}
                <DialogActions sx={{
                    justifyContent: 'flex-end',
                    p: 2,
                    borderTop: '1px solid #e2e8f0',
                    bgcolor: '#f8fafc'
                }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{ minWidth: 120 }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default IdCardPreview;
