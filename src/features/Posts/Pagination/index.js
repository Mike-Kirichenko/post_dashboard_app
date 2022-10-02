import { useDispatch, useSelector } from "react-redux";
import { Pagination as Page, Stack, Box } from "@mui/material";
import {
  fetchPosts,
  getActivePage,
  getPostsQty,
  setActivePage
} from "../postsSlice";
import "./pagination.css";

const Pagination = ({ limit }) => {
  const dispatch = useDispatch();
  const postsQty = useSelector(getPostsQty);
  const pagesQty = Math.ceil(postsQty / limit);
  const activePage = useSelector(getActivePage);

  const handleSetPage = (event, value) => {
    dispatch(setActivePage(value));
    dispatch(fetchPosts({ page: value, limit }));
  };

  return (
    <Box id="pages-wrapper">
      <Box id="pages">
        <Stack spacing={2}>
          <Page
            count={pagesQty}
            page={activePage}
            color="primary"
            onChange={handleSetPage}
          />
        </Stack>
      </Box>
    </Box>
  );
};
export default Pagination;
