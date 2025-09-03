import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Button, IconButton, Avatar, Card, CardContent, Typography, Divider } from '@mui/material';
import { X, QrCode } from 'lucide-react';

const TestIcardPrint = () => {
  const [open, setOpen] = useState(false);

  // Sample static employee data
  const employees = [
    { name: "John Doe", employeeId: "E1185", position: "Account Executive", joiningDate: "19 JUL 2025" },
    { name: "Jane Smith", employeeId: "E1186", position: "HR Manager", joiningDate: "10 JAN 2024" },
    { name: "Robert Johnson", employeeId: "E1187", position: "Software Engineer", joiningDate: "05 MAR 2025" },
  ];

  const handlePrint = () => {
    window.print();
  };

  // Single IdCard component
  const IdCard = ({ employeeData }) => (
    <Card className="id-card" sx={{ width: 300, padding: 2, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>{employeeData.name[0]}</Avatar>
          <Box>
            <Typography variant="h6">{employeeData.name}</Typography>
            <Typography variant="body2">{employeeData.position}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">ID: {employeeData.employeeId}</Typography>
        <Typography variant="body2">Joining: {employeeData.joiningDate}</Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <QrCode size={24} />
        </Box>
      </CardContent>
    </Card>
  );

  // Dialog to preview all cards
  const IdCardPreview = () => (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
        >
          <X size={20} />
        </IconButton>

        <DialogContent>
          <Box className="id-card-print-wrapper" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {employees.map((emp, idx) => (
              <IdCard key={idx} employeeData={emp} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" startIcon={<QrCode size={16} />} onClick={handlePrint}>
              Print All
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show ID Cards
      </Button>
      <IdCardPreview />

      {/* --- Print Styles --- */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .id-card-print-wrapper, .id-card-print-wrapper * { visibility: visible; }
          .id-card-print-wrapper { position: absolute; top: 0; left: 0; width: 100%; display: flex; flex-direction: row; align-items: center; }
          .id-card { page-break-inside: avoid; margin-bottom: 16px; }
          button { display: none !important; }
        }
      `}</style>
    </Box>
  );
};

export default TestIcardPrint;
