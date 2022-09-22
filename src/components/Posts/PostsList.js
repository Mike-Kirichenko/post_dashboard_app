import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import PostTableHeader from './PostTableHeader';
import Post from './Post';
import PostTableFooter from './PostsTableFooter';

const createData = (createdAt, updatedAt, title, desc) => {
  return { createdAt, updatedAt, title, desc };
};

const rows = [
  createData(
    '20/09/2022',
    '20/09/2021',
    'Test title sadsadsadsad ',
    'Test text'
  ),
  createData('20/09/2022', '20/09/2021', 'Test title sadsadsa ', 'Test text'),
  createData(
    '20/09/2022',
    '20/09/2021',
    'Test titleasd as dsa dsa',
    'Test text'
  ),
  createData(
    '20/09/2022',
    '20/09/2021',
    'Test title asf as gasgsag ',
    'Test text'
  ),
  createData(
    '20/09/2022',
    '20/09/2021',
    'Test title',
    'საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული.'
  ),
];

const PostsList = () => {
  return (
    <Table>
      <PostTableHeader />
      <TableBody>
        {rows.map((row) => (
          <Post row={row} />
        ))}
      </TableBody>
      <PostTableFooter />
    </Table>
  );
};

export default PostsList;
