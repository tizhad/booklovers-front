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
  const theme = createTheme();
  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  useEffect(
    (userBooks) => {
      dispatch(getUserBooks());
    },
    [dispatch]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h6" align="center" className="quote" mt={4} ml={50}>
        “The more that you read, the more things you will know. The more that
        you learn, the more places you’ll go.” ― Dr. Seuss, I Can Read With My
        Eyes Shut!
      </Typography>
      <Container sx={{ py: 8 }}>
        <InProgressBooks books={userBooks} updateBook={updateBook} />
        <FinishedBooks books={userBooks} updateBook={updateBook} />
        <NotStartedBooks books={userBooks} updateBook={updateBook} />
      </Container>
    </ThemeProvider>
  );
};

export default MyBooks;
