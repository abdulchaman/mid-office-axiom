import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type PoolName = "Sr UW" | "CUW" | "UW" | "HOD" | "CMO";
type PoolFilter = "All" | PoolName;

interface AssessmentCommentRow {
  userId: string;
  userName: string;
  poolName: PoolName;
  caseStatus: string;
  decision: string;
  comments: string;
  updatedOn: string;
}

const ASSESSMENT_COMMENTS: AssessmentCommentRow[] = [
  { userId: "AC1024", userName: "Senior Underwriter", poolName: "Sr UW", caseStatus: "Referred", decision: "Refer", comments: "Case referred for senior review.\nAwaiting senior underwriter approval.", updatedOn: "07/09/2026 11:36:09" },
  { userId: "ipru75474", userName: "ipru75474", poolName: "CUW", caseStatus: "In Progress", decision: "Pending", comments: "Underwriting review initiated", updatedOn: "07/09/2026 10:52:41" },
  { userId: "UW304", userName: "Underwriting User", poolName: "UW", caseStatus: "Completed", decision: "Reject", comments: "Consent document not uploaded", updatedOn: "07/09/2026 09:22:07" },
  { userId: "CUW890", userName: "CUW Analyst", poolName: "CUW", caseStatus: "Referred", decision: "Refer", comments: "Medical review requested", updatedOn: "07/09/2026 08:54:14" },
  { userId: "UW327", userName: "Underwriting User", poolName: "UW", caseStatus: "Completed", decision: "Waived", comments: "Requirement waived as per guidelines", updatedOn: "07/09/2026 08:18:10" },
  { userId: "SUW203", userName: "Senior Underwriter", poolName: "Sr UW", caseStatus: "Completed", decision: "Accept", comments: "Senior underwriting review completed", updatedOn: "07/09/2026 08:04:28" },
  { userId: "HOD071", userName: "Head of Department", poolName: "HOD", caseStatus: "Referred", decision: "Refer", comments: "Case escalated for HOD approval.\nDecision is pending from the approver.", updatedOn: "07/09/2026 07:49:56" },
  { userId: "CMO112", userName: "Chief Medical Officer", poolName: "CMO", caseStatus: "In Progress", decision: "Pending", comments: "Medical opinion is under review and further supporting information is required before the final assessment can be completed.", updatedOn: "07/09/2026 07:35:19" },
  { userId: "UW405", userName: "Underwriting User", poolName: "UW", caseStatus: "Completed", decision: "Accept", comments: "Underwriting assessment approved", updatedOn: "07/09/2026 07:20:44" },
];

const POOL_FILTERS: PoolFilter[] = ["All", "Sr UW", "CUW", "UW", "HOD", "CMO"];
const ROWS_PER_PAGE = 10;

const poolTone: Record<PoolFilter, { background: string; color: string; count: string }> = {
  All: { background: "#F5F3F2", color: "#514A46", count: "#697780" },
  "Sr UW": { background: "#EEF6FF", color: "#2F668F", count: "#46799F" },
  CUW: { background: "#EEF8F1", color: "#28743C", count: "#28743C" },
  UW: { background: "#FFF3E8", color: "#B54A00", count: "#E45F14" },
  HOD: { background: "#FDEBEC", color: "#B3262E", count: "#B3262E" },
  CMO: { background: "#F3EEFF", color: "#6C4AA0", count: "#6C4AA0" },
};

const AuditTrailPage = () => {
  const [selectedPool, setSelectedPool] = useState<PoolFilter>("All");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(
    () => selectedPool === "All"
      ? ASSESSMENT_COMMENTS
      : ASSESSMENT_COMMENTS.filter((row) => row.poolName === selectedPool),
    [selectedPool],
  );
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ROWS_PER_PAGE;
  const visibleRows = filteredRows.slice(start, start + ROWS_PER_PAGE);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ pt: 1 }}>
        <Paper elevation={0} sx={{ border: "1px solid #D8D8D8", borderRadius: "14px", overflow: "hidden" }}>
          <Box sx={{ bgcolor: "#E45F14", color: "#FFFFFF", px: 3, py: 1.2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Assessment Comments</Typography>
          </Box>

          <Box
            aria-label="Filter by pool name"
            sx={{ minHeight: 36, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.625, px: 0.75, py: 0.5, borderBottom: "1px solid #E1E1E1", bgcolor: "#FAFBFC" }}
          >
            {POOL_FILTERS.map((pool) => {
              const tone = poolTone[pool];
              const count = pool === "All" ? ASSESSMENT_COMMENTS.length : ASSESSMENT_COMMENTS.filter((row) => row.poolName === pool).length;
              const active = selectedPool === pool;

              return (
                <Button
                  key={pool}
                  type="button"
                  onClick={() => { setSelectedPool(pool); setPage(1); }}
                  sx={{
                    minWidth: 0,
                    height: 24,
                    px: 1,
                    border: `1px solid ${active ? "#E45F14" : "#DDE2E6"}`,
                    borderRadius: "12px",
                    bgcolor: active ? "#FFF1E6" : tone.background,
                    color: active ? "#C4500D" : tone.color,
                    fontSize: 10.5,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#FFF1E6", borderColor: "#E45F14" },
                  }}
                >
                  {pool}
                  <Box component="span" sx={{ minWidth: 17, height: 17, ml: 0.5, px: 0.5, display: "inline-grid", placeItems: "center", borderRadius: "9px", bgcolor: tone.count, color: "#FFFFFF", fontSize: 9.5, fontWeight: 700 }}>
                    {count}
                  </Box>
                </Button>
              );
            })}
          </Box>

          <TableContainer>
            <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  {[
                    ["User ID", "8%"], ["User Name", "10%"], ["Pool Name", "8%"],
                    ["Case Status", "9%"], ["Decision", "8%"], ["Date Updated On", "12%"],
                    ["Comments/Remarks", "45%"],
                  ].map(([header, width]) => (
                    <TableCell key={header} sx={{ width, bgcolor: "#FFEAD7", color: "#000000", px: 1, py: 0.5, fontSize: 12, fontWeight: 600, lineHeight: 1.2, borderBottom: "1px solid #D6D6D6" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={`${row.userId}-${row.updatedOn}`}>
                    {[row.userId, row.userName, row.poolName, row.caseStatus, row.decision, row.updatedOn, row.comments].map((value, index) => (
                      <TableCell key={index} sx={{ color: "#4A4A4A", px: 1, py: 0.5, fontSize: 10, lineHeight: 1.5, whiteSpace: index === 6 ? "pre-line" : "normal", overflowWrap: "anywhere", borderBottom: "1px solid #E1E1E1" }}>
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ minHeight: 42, px: 2, py: 0.875, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, borderTop: "1px solid #E1E1E1" }}>
            <Typography sx={{ color: "#6F6F6F", fontSize: 11 }}>
              {filteredRows.length ? `${start + 1}-${Math.min(start + ROWS_PER_PAGE, filteredRows.length)} of ${filteredRows.length}` : "0 of 0"}
            </Typography>
            <Button aria-label="Previous page" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} sx={{ minWidth: 28, width: 28, height: 28, p: 0, border: "1px solid #D8D8D8", color: "#9A2529" }}>‹</Button>
            <Typography sx={{ color: "#6F6F6F", fontSize: 11 }}>Page {safePage} of {totalPages}</Typography>
            <Button aria-label="Next page" disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} sx={{ minWidth: 28, width: 28, height: 28, p: 0, border: "1px solid #D8D8D8", color: "#9A2529" }}>›</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuditTrailPage;
