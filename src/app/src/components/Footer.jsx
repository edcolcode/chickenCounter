import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      p: 1,
      mt: 'auto',
      backgroundColor: 'primary.main'
    }}
  >
    <Container maxWidth="sm">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        {'( °)>'} Chicken Counter - Edgar Colmenares {'<(° )'}
      </Typography>
    </Container>
  </Box>
);

export default Footer;