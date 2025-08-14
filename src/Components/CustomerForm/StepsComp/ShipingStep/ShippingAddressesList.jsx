import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { MapPin, Edit, Printer, Lock, Unlock, Trash2 } from "lucide-react";
import { Badge } from "../../../Ui";

export default function ShippingAddressesList({
  addresses,
  onEdit,
  onDelete,
  onToggleLock,
  onPrint,
  onSetDefault,
}) {
  return (
    <>
      {addresses.map((address) => (
        <Card key={address.id} variant="outlined" sx={{ mb: 2, position: "relative" }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1">
                  {address.firstName} {address.lastName}
                </Typography>
                {address.isDefault && <Badge variant="destructive">Default</Badge>}
              </Box>
            }
            subheader={`${address.address}, ${address.city}, ${address.state} ${address.zipCode}`}
            action={
              <Box sx={{ display: "flex", gap: 1 }}>
                {!address.isLocked && (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onEdit(address)}
                      startIcon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onPrint(address)}
                      startIcon={<Printer size={16} />}
                    >
                      Print
                    </Button>
                  </>
                )}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onToggleLock(address.id)}
                  startIcon={address.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                >
                  {address.isLocked ? "Unlock" : "Lock"}
                </Button>
                {!address.isLocked && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(address.id)}
                    startIcon={<Trash2 size={16} />}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Phone:</strong> {address.mobile}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Country:</strong> {address.country}
                </Typography>
              </Grid>
              {!address.isDefault && !address.isLocked && (
                <Grid item xs={12}>
                  <Button variant="outlined" onClick={() => onSetDefault(address.id)} size="small">
                    Set as Default
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
