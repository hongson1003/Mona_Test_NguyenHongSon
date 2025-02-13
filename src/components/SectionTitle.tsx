import { Typography, Box } from "@mui/material";

interface ISectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: ISectionTitleProps) => {
  return (
    <Box sx={{ textAlign: "center", position: "relative", mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary">
        {title}
      </Typography>
      <Box
        sx={{
          width: 80,
          height: 4,
          backgroundColor: "primary.main",
          margin: "8px auto 0",
          borderRadius: 2,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 40,
            height: 4,
            backgroundColor: "secondary.main",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scaleX(0.8)",
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
};

export default SectionTitle;
