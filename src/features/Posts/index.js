import { TableContainer } from "@mui/material";
import UserPanel from "../../components/UserPanel";
import Paper from "@mui/material/Paper";
import PostsList from "./PostsList";
import Filter from "../../components/Filter";
import PostPreview from "./PostPreview";
import AddPost from "./AddPost";
import DeleteModal from "./DeleteModal";

const Posts = () => {
  return (
    <>
      <UserPanel />
      <Filter />
      <AddPost />
      <TableContainer component={Paper}>
        <PostsList />
      </TableContainer>
      <PostPreview />
      <DeleteModal />
    </>
  );
};

export default Posts;
