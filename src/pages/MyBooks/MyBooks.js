import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import { selectToken } from "../../store/user/selectors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InProgressBooks from "../../components/InProgressBooks/InProgressBooks";
import { Container } from "@mui/material";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import NotStartedBooks from "../../components/NotStartedBooks/NotStartedBooks";



const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const theme = createTheme();
  const token = useSelector(selectToken);

  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  useEffect(
    () => {
      dispatch(getUserBooks());
    },
    [dispatch]
  );
  if (!token) return (
      <>
          <div className="alert alert-success" role="alert">
              {" "}
              <h4 className="alert-heading">Book Lovers</h4>
              <p>Please login to see your books! <br/> You can add new books to your list by clicking the Search button!</p>
          </div>
        <Typography variant="h5" align="center" className="quote" mt={4}>
          “The more that you read, the more things you will know. The more
          that you learn, the more places you’ll go.” <br/>― Dr. Seuss, <br/> "I Can Read
          With My Eyes Shut!"
        </Typography>
      </>

  );
  return (
      <>
        <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }}>
          <InProgressBooks books={userBooks} updateBook={updateBook} />
          <FinishedBooks books={userBooks} updateBook={updateBook} />
          <NotStartedBooks books={userBooks} updateBook={updateBook} />
        </Container>
    </ThemeProvider>
      </>
  );
};

export default MyBooks;
