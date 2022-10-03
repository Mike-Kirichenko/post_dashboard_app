import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedPosts,
  getAllPosts,
  addToSelected,
  removeFromSelected,
  setRemoveQty
} from "../postsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

const PostTableHeader = () => {
  const dispatch = useDispatch();

  const headings = ["CreatedAt", "Title", "Desc", "Category", "Img", "Preview"];

  const allPostIds = useSelector(getAllPosts).map((post) => post.id);
  const selectedPostIds = useSelector(getSelectedPosts);

  const handleSetAllChecked = () => {
    const allSeleted = checkSelected();
    if (allSeleted) dispatch(removeFromSelected(allPostIds));
    else dispatch(addToSelected(allPostIds));
  };

  const checkSelected = () =>
    allPostIds.every((el) => selectedPostIds.includes(el));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={checkSelected()}
            color="primary"
            onChange={handleSetAllChecked}
          />
        </TableCell>
        <TableCell>
          {selectedPostIds.length > 0 && (
            <>
              <DeleteIcon
                className="interactive-icon"
                onClick={() => dispatch(setRemoveQty(selectedPostIds.length))}
              />
              <Typography variant="sup" component="sup">
                {selectedPostIds.length}
              </Typography>
            </>
          )}
        </TableCell>
        {headings.map((headingText, index) => (
          <TableCell key={`${headingText}-${index}`}>{headingText} </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default PostTableHeader;
