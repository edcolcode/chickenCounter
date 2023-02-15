import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { styled } from '@mui/material/styles';

const Footer = () => {
  const FooterBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main
  }));

  return (
    <FooterBox
      component="footer"
      sx={{
        p: 1,
        mt: 'auto'
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
    </FooterBox>
  );
}

export default Footer;