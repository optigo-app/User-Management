import React from "react";
import { Button, Stack } from "@mui/material";
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from "lucide-react";

export default function FormNavigation({
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    onSaveDraft,
    onComplete,
}) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
        >
            {/* Previous Step */}
            <Button
                variant="outlined"
                onClick={onPrevious}
                disabled={currentStep === 1}
                startIcon={<ArrowLeft size={20} />}
                sx={{
                    px: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    borderWidth: 2,
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "grey.50" },
                }}
            >
                Previous Step
            </Button>

            {/* Right Actions */}
            <Stack direction="row" spacing={2}>
                {/* Save Draft */}
                <Button
                    variant="outlined"
                    onClick={onSaveDraft}
                    startIcon={<Save size={20} />}
                    sx={{
                        px: 3,
                        py: 1.5,
                        fontSize: "1rem",
                        borderWidth: 2,
                        bgcolor: "transparent",
                        "&:hover": { bgcolor: "grey.50" },
                    }}
                >
                    Save Draft
                </Button>

                {/* Next / Complete */}
                {currentStep === totalSteps ? (
                    <Button
                        variant="contained"
                        onClick={onComplete}
                        startIcon={<CheckCircle2 size={20} />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        Complete Registration
                    </Button>
                ) : (
                    <Button
                        onClick={onNext}
                        endIcon={<ArrowRight size={20} />}
                        variant="contained"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            color: "#fff",
                            "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        Next Step
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
