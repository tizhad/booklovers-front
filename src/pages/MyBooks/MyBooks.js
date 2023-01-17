import React, { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import InProgressBooks from "../../components/InProgressBooks/InProgressBooks";
import { Container } from "@mui/material";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import NotStartedBooks from "../../components/NotStartedBooks/NotStartedBooks";

const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  console.log(userBooks, "users books");
  const theme = createTheme();
  const updateBook = useCallback(
    (book) => {
      dispatch(createBook(book));
      dispatch(getUserBooks());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Typography variant="h5" align="center" color="textSecondary">
          “The more that you read, the more things you will know. The more that
          you learn, the more places you’ll go.” ― Dr. Seuss, I Can Read With My
          Eyes Shut!
        </Typography>
        <Container sx={{ py: 8 }} maxwidth="md">
          <InProgressBooks books={userBooks} updateBook={updateBook} />
          <FinishedBooks books={userBooks} updateBook={updateBook} />
          <NotStartedBooks books={userBooks} updateBook={updateBook} />
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default MyBooks;
