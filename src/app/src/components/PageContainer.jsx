import {
  Container,
  Typography
} from '@mui/material';

const PageContainer = ({name, containerSX, children}) => (
  <Container 
    maxWidth="sm"
    sx={containerSX}>
    <Typography
      component="h2"
      variant="h6"
      align="center"
      color="text.primary"
      gutterBottom
    >
      {name}
    </Typography>
    {children}
  </Container>
);

export default PageContainer;