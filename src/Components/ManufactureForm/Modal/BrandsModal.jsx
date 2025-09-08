import React, { memo, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
} from "@mui/material";
import "./BrandsModal.scss";
import { CircleX } from "lucide-react";
import { ToggleSwitch } from "../../Ui/ToggleSwitch";

const BrandsModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([
    { sr: 1, brandCode: "BR001", brandName: "Premium Gold", bindFlag: true },
    { sr: 2, brandCode: "BR002", brandName: "Silver Elite", bindFlag: false },
    { sr: 3, brandCode: "BR003", brandName: "Platinum Plus", bindFlag: true },
    { sr: 4, brandCode: "BR004", brandName: "Diamond Crown", bindFlag: false },
    { sr: 5, brandCode: "BR005", brandName: "Royal Collection", bindFlag: true },
    { sr: 6, brandCode: "BR006", brandName: "Heritage Series", bindFlag: false },
    { sr: 7, brandCode: "BR007", brandName: "Modern Classic", bindFlag: true },
    { sr: 8, brandCode: "BR008", brandName: "Luxury Line", bindFlag: false },
  ]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter(row => 
      row.brandCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  const handleBindFlagChange = (index) => {
    const updated = [...rows];
    const originalIndex = rows.findIndex(row => row.sr === filteredRows[index].sr);
    updated[originalIndex].bindFlag = !updated[originalIndex].bindFlag;
    setRows(updated);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{ maxHeight: "80vh" }}
      fullWidth
      keepMounted
      aria-describedby="BrandsModal"
    >
      <DialogTitle className="brands-modal__title">
        Brand Management
        <IconButton className="brands-modal__close" onClick={onClose}>
          <CircleX />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="brands-modal__content">
        <Box className="brands-modal__inputBox">
          <label>Search Brands</label>
          <TextField
            placeholder="Search by brand code or name"
            type="text"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <Table className="brands-modal__table">
          <TableHead>
            <TableRow>
              <TableCell>Sr#</TableCell>
              <TableCell>Brand Code</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Bind Flag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.sr}</TableCell>
                <TableCell>{row.brandCode}</TableCell>
                <TableCell>{row.brandName}</TableCell>
                <TableCell>
                    <ToggleSwitch
                      checked={row.bindFlag}
                      onChange={() => handleBindFlagChange(i)}
                      activeColor="#4caf50"
                      inactiveColor="#9e9e9e"
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default memo(BrandsModal);
