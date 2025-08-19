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
} from "@mui/material";
import "./PurityRatioModal.scss";
import { CircleX } from "lucide-react";

const PurityRatioModal = ({ open, onClose }) => {
  const [gold24Price, setGold24Price] = useState('');
  const [rows, setRows] = useState([
    { metal: "GOLD", purity: "18K", ratio: 75, price: 285 },
    { metal: "GOLD", purity: "10K", ratio: 42, price: 159.6 },
    { metal: "GOLD", purity: "10KT", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "12k", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "14K", ratio: 58, price: 220.4 },
    { metal: "GOLD", purity: "14.5k", ratio: 0, price: 0 },
    { metal: "GOLD", purity: "14.9K", ratio: 62, price: 235.6 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
    { metal: "GOLD", purity: "14K", ratio: 60, price: 228 },
  ]);

  // When ratio changes, recalc price
  const handleRatioChange = (index, value) => {
    const updated = [...rows];
    updated[index].ratio = Number(value);
    updated[index].price = ((updated[index].ratio / 100) * gold24Price).toFixed(
      2
    );
    setRows(updated);
  };

  // When price changes, recalc ratio
  const handlePriceChange = (index, value) => {
    const updated = [...rows];
    updated[index].price = Number(value);
    updated[index].ratio = gold24Price
      ? ((updated[index].price / gold24Price) * 100).toFixed(2)
      : 0;
    setRows(updated);
  };

  // Apply gold24Price to all rows
  const handleApplyAll = () => {
    if (!gold24Price) return;
    const updated = rows.map((r) => ({
      ...r,
      price: ((r.ratio / 100) * gold24Price).toFixed(2),
    }));
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
          <label>Gold 24k Price</label>
          <TextField
            placeholder="Gold 24k Price"
            type="number"
            variant="outlined"
            size="small"
            value={gold24Price}
            onChange={(e) => setGold24Price(Number(e.target.value))}
          />
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

