import { useDispatch, useSelector } from "react-redux";
import { addPostPreviewData } from "../../../PostPreview/postPreviewSlice";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { formatDate } from "../../../../helpers";
import {
  getSelectedPosts,
  addToSelected,
  removeFromSelected
} from "../../postsSlice";
import "./post.css";

const Post = ({ row }) => {
  const dispatch = useDispatch();
  const selectedPosts = useSelector(getSelectedPosts);

  const noImgUrl = "./static-imgs/no-img.png";
  const { id, createdAt, title, text, category, img } = row;

  const [createdAtDate, createdAtTime] = formatDate(
    new Date(Number(createdAt))
  ).split(" ");

  const handleSetSelected = () => {
    if (!selectedPosts.includes(id)) dispatch(addToSelected(id));
    else dispatch(removeFromSelected(id));
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selectedPosts.includes(id)}
          onChange={handleSetSelected}
        />
      </TableCell>
      <TableCell>
        <ModeEditIcon className="interactive-icon" />
      </TableCell>
      <TableCell>
        <Box className="date-time-box">
          <CalendarMonthIcon />
          &nbsp;{createdAtDate}
          &nbsp;
          <AccessTimeIcon />
          &nbsp;{createdAtTime}
        </Box>
      </TableCell>
      <TableCell className="post-title">{title}</TableCell>
      <TableCell className="post-text">
        {text.length > 100 ? `${text.substring(0, 50)}...` : text}
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Box className="post-table-thumb-box">
          <img
            src={img ? img : noImgUrl}
            alt={title}
            className="resp-img thumb"
          />
        </Box>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(addPostPreviewData(row))}
        >
          <MenuBookIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Post;
