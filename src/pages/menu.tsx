import { Menu } from "react-admin";
import { Box, Typography, Divider } from "@mui/material";

export const CustomMenu = (props: any) => (
  <Box sx={{ width: 250, bgcolor: "#1E1E2F", height: "100vh", color: "white" }}>
    {/* En-tête de la Sidebar */}
    <Box sx={{ p: 2, textAlign: "center", bgcolor: "#28293E" }}>
      <Typography variant="h6">Admin Panel</Typography>
    </Box>

    <Divider sx={{ bgcolor: "#444" }} />

    {/* Menu de Navigation */}
    <Menu {...props} />

    {/* Pied de page */}
    <Box sx={{ position: "absolute", bottom: 10, width: "100%", textAlign: "center" }}>
      <Typography variant="caption">© 2024 MyApp</Typography>
    </Box>
  </Box>
);
