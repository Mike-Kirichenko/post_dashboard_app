import { Pagination as Page, Stack, Box } from "@mui/material";
import "./pagination.css";

const Pagination = () => {
  return (
    <Box id="pages-wrapper">
      <Box id="pages">
        <Stack spacing={2}>
          <Page count={10} color="primary" />
        </Stack>
      </Box>
    </Box>
  );
};
export default Pagination;
