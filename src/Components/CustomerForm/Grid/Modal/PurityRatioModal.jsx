import React, { memo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./PurityRatioModal.scss";
import { CircleX } from "lucide-react";

const PurityRatioModal = ({ open, onClose }) => {
  const [selectedMetal, setSelectedMetal] = useState('Gold 24k');
  const [gold24Price, setGold24Price] = useState('');
  const [rows, setRows] = useState([
    { metal: "GOLD", purity: "18K", ratio: 75, price: 285 },
    { metal: "GOLD", purity: "10K", ratio: 42, price: 159.6 },
    { metal: "GOLD", purity: "10KT", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "12k", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "14K", ratio: 58, price: 220.4 },
    { metal: "GOLD", purity: "14.5k", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "14.9K", ratio: 62, price: 235.6 },
    { metal: "SILVER", purity: "925", ratio: 92.5, price: 35.15 },
    { metal: "SILVER", purity: "999", ratio: 99.9, price: 37.96 },
    { metal: "PLATINUM", purity: "950", ratio: 95, price: 855 },
    { metal: "PLATINUM", purity: "999", ratio: 99.9, price: 899.1 },
  ]);

  const metalOptions = [
    'Gold 24k',
    'Gold 18k', 
    'Gold 14k',
    'Gold 10k',
    'Silver 925',
    'Silver 999',
    'Platinum 950',
    'Platinum 999'
  ];

  // When ratio changes, recalc price
  const handleRatioChange = (index, value) => {
    const updated = [...rows];
    updated[index].ratio = Number(value);
    
    // Get base price for the metal type
    let basePrice = gold24Price;
    if (updated[index].metal === "SILVER") {
      basePrice = gold24Price * 0.1;
    } else if (updated[index].metal === "PLATINUM") {
      basePrice = gold24Price * 2.3;
    }
    
    updated[index].price = ((updated[index].ratio / 100) * basePrice).toFixed(2);
    setRows(updated);
  };

  // When price changes, recalc ratio
  const handlePriceChange = (index, value) => {
    const updated = [...rows];
    updated[index].price = Number(value);
    
    // Get base price for the metal type
    let basePrice = gold24Price;
    if (updated[index].metal === "SILVER") {
      basePrice = gold24Price * 0.1;
    } else if (updated[index].metal === "PLATINUM") {
      basePrice = gold24Price * 2.3;
    }
    
    updated[index].ratio = basePrice
      ? ((updated[index].price / basePrice) * 100).toFixed(2)
      : 0;
    setRows(updated);
  };

  // Apply gold24Price to all metal types dynamically
  const handleApplyAll = () => {
    if (!gold24Price) return;
    
    const updated = rows.map((r) => {
      let basePrice = gold24Price;
      
      // Set base prices for different metal types
      if (r.metal === "SILVER") {
        basePrice = gold24Price * 0.1; // Silver is typically 10% of gold price
      } else if (r.metal === "PLATINUM") {
        basePrice = gold24Price * 2.3; // Platinum is typically 2.3x gold price
      }
      // GOLD uses the direct gold24Price
      
      return {
        ...r,
        price: ((r.ratio / 100) * basePrice).toFixed(2),
      };
    });
    
    setRows(updated);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{ maxHeight: "60vh" }}
      fullWidth
      keepMounted
      aria-describedby="PurityRatio"
    >
      <DialogTitle className="purity-modal__title">
        V01661 : Purity Ratio
        <IconButton className="purity-modal__close" onClick={onClose}>
          <CircleX />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="purity-modal__content">
        <Box className="purity-modal__inputBox">
          <Box className="purity-modal__field">
            <FormControl size="small" fullWidth>
              <Select
                value={selectedMetal}
                onChange={(e) => setSelectedMetal(e.target.value)}
                className="purity-modal__select"
              >
                {metalOptions.map((metal) => (
                  <MenuItem key={metal} value={metal}>
                    {metal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box className="purity-modal__field">
            <TextField
              placeholder="Gold 24k Price"
              type="number"
              variant="outlined"
              size="small"
              value={gold24Price}
              onChange={(e) => setGold24Price(Number(e.target.value))}
            />
          </Box>
          
          <Button variant="contained" onClick={handleApplyAll}>
            Apply to All
          </Button>
        </Box>

        <Table className="purity-modal__table">
          <TableHead>
            <TableRow>
              <TableCell>Metal Type</TableCell>
              <TableCell>Purity</TableCell>
              <TableCell>Price Ratio (%)</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.metal}</TableCell>
                <TableCell>{row.purity}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.ratio}
                    size="small"
                    onChange={(e) => handleRatioChange(i, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.price}
                    size="small"
                    onChange={(e) => handlePriceChange(i, e.target.value)}
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

export default memo(PurityRatioModal);

