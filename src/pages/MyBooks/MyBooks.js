import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import { Container, Row, Col } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const theme = createTheme();

  //In-progress books
  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });

  //Finished books
  const finishedBooks = userBooks.filter((book) => {
    return book.status === "read";
  });

  //ot-started books

  const notStarted = userBooks.filter((book) => {
    return book.status === "to-read";
  });

  // get all users books
  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxwidth="lg">
            <Typography variant="h5" align="center" color="#3D4B5B">
              “The more that you read, the more things you will know. The more
              that you learn, the more places you’ll go.” ― Dr. Seuss, I Can
              Read With My Eyes Shut!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxwidth="md">
          <h6 className="mb-4">In Progress</h6>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {inProgressBooks.map((book) => (
              <Book
                key={book.googleID}
                categories={book.categories}
                googleID={book.googleID}
                title={book.title}
                authors={book.author}
                imageURL={book.imageURL}
                status={book.status}
                rate={book.rate}
                progress={book.progress}
                onUpdateBook={updateBook}
              />
            ))}
          </Grid>
          <h6 className="mb-4">Want To Read</h6>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {notStarted.map((book) => (
              <Book
                key={book.googleID}
                categories={book.categories}
                googleID={book.googleID}
                title={book.title}
                authors={book.author}
                imageURL={book.imageURL}
                status={book.status}
                rate={book.rate}
                progress={book.progress}
                onUpdateBook={updateBook}
              />
            ))}
          </Grid>
          <h6 className="mb-4">Finished</h6>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {finishedBooks.map((book) => (
              <Book
                key={book.googleID}
                categories={book.categories}
                googleID={book.googleID}
                title={book.title}
                authors={book.author}
                imageURL={book.imageURL}
                status={book.status}
                rate={book.rate}
                progress={book.progress}
                onUpdateBook={updateBook}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default MyBooks;
