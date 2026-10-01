import {
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CustomButton from "../../components/ui/Button/Button";
import CustomDialog from "../../components/ui/Dialog/Dialog";

const GUIDELINE_ROWS = [
  ["Income document waived or not received", "Income document waived or not raised. Please provide justification", ""],
  ["Medical requirement waived or not received", "Medical document waived or not raised. Please provide justification", ""],
  ["Financially not viable", "Justification required as financial eligibility is less than TFSA", ""],
  ["DRC Risk Blank or Null Risk", "DRC Risk value is Blank or Null Risk — kindly take counter signing", "REFER_TO_CS"],
  ["TSA above your UW limit", "Case above your underwriting limit, please take counter signing", "REFER_TO_CS"],
  ["Application form validity expired", "Please call for fresh medical questionnaire", "REFER_TO_HOD"],
  ["BIU model response field is blank", "BIU models predict response is blank — cannot take STD, XRT or COF decision. Kindly get the BIU response", ""],
] as const;

const JUSTIFICATION_REASONS = [
  "Requirement waived",
  "Document pending",
  "Financial assessment",
  "Medical assessment",
  "Counter signing",
  "Other",
] as const;

const headerCellSx = {
  bgcolor: "#FFF0E5",
  color: "#4A3025",
  fontSize: 11,
  fontWeight: 800,
  borderRight: "1px solid #E3DDD9",
};

/** UW guideline action shared only by the retail Sr UW and HOD SDT sections. */
const UWGuidelines = () => {
  const [open, setOpen] = useState(false);
  const [reasons, setReasons] = useState<Record<number, string>>({});
  const [remarks, setRemarks] = useState<Record<number, string>>({});
  const [showErrors, setShowErrors] = useState(false);

  const closeDialog = () => {
    setOpen(false);
    setShowErrors(false);
  };

  const confirmGuidelines = () => {
    const incomplete = GUIDELINE_ROWS.some((_, index) => {
      const hasReason = Boolean(reasons[index]);
      const hasRemark = Boolean(remarks[index]?.trim());
      return hasReason !== hasRemark;
    });

    if (incomplete) {
      setShowErrors(true);
      return;
    }

    closeDialog();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 1.5,
          py: 1,
          borderLeft: { xs: "none", md: "1px solid #E8E1DE" },
          borderTop: { xs: "1px solid #E8E1DE", md: "none" },
        }}
      >
        <CustomButton
          type="button"
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "#E45F14",
            "&:hover": { bgcolor: "#D6530E" },
          }}
        >
          UW Guidelines ({GUIDELINE_ROWS.length})
        </CustomButton>
      </Box>

      <CustomDialog
        open={open}
        onClose={closeDialog}
        title="UW Guidelines"
        maxWidth="xl"
        fullWidth
        titleSx={{ bgcolor: "#E45F14", color: "#FFFFFF", fontSize: 16 }}
        paperSx={{
          width: "min(1280px, calc(100vw - 48px))",
          "& > .MuiIconButton-root": { color: "#FFFFFF" },
        }}
        contentSx={{ pt: 1.5 }}
        actionsSx={{ px: 3, pb: 2, gap: 1.25 }}
        actions={
          <>
            <CustomButton type="button" variant="outlined" onClick={closeDialog}>
              Back
            </CustomButton>
            <CustomButton type="button" variant="contained" onClick={confirmGuidelines}>
              Confirm &amp; Submit
            </CustomButton>
          </>
        }
      >
        <Typography sx={{ mb: 1.5, color: "#6D625D", fontSize: 12 }}>
          Select a justification reason to enable its remarks field. Remarks are mandatory for every selected reason.
        </Typography>

        <TableContainer sx={{ border: "1px solid #DED6D1", borderRadius: "10px" }}>
          <Table size="small" sx={{ minWidth: 920 }}>
            <TableHead>
              <TableRow>
                {[
                  "Reason",
                  "Remark",
                  "System Action",
                  "Justification Reason",
                  "Justification Remarks",
                ].map((header) => (
                  <TableCell key={header} sx={headerCellSx}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {GUIDELINE_ROWS.map((row, index) => {
                const reasonSelected = Boolean(reasons[index]);
                const remarkMissing = showErrors && reasonSelected && !remarks[index]?.trim();

                return (
                  <TableRow key={row[0]}>
                    <TableCell sx={{ fontSize: 11 }}>{row[0]}</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>{row[1]}</TableCell>
                    <TableCell sx={{ color: "#8D232A", fontSize: 11, fontWeight: 700 }}>
                      {row[2] || "—"}
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={reasons[index] ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          setReasons((current) => ({ ...current, [index]: value }));
                          if (!value) {
                            setRemarks((current) => ({ ...current, [index]: "" }));
                          }
                        }}
                      >
                        <MenuItem value="">Select reason</MenuItem>
                        {JUSTIFICATION_REASONS.map((reason) => (
                          <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        disabled={!reasonSelected}
                        required={reasonSelected}
                        error={remarkMissing}
                        helperText={remarkMissing ? "Remarks are required" : ""}
                        value={remarks[index] ?? ""}
                        placeholder={reasonSelected ? "Add remarks (required)" : "Select a reason first"}
                        onChange={(event) =>
                          setRemarks((current) => ({ ...current, [index]: event.target.value }))
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomDialog>
    </>
  );
};

export default UWGuidelines;
