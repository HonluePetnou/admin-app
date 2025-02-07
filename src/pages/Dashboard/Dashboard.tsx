import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { useGetList } from "react-admin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom dataset
const chartData = [
  { month: "Jan", users: 400, posts: 240 },
  { month: "Feb", users: 600, posts: 320 },
  { month: "Mar", users: 800, posts: 450 },
  { month: "Apr", users: 700, posts: 500 },
  { month: "May", users: 1000, posts: 620 },
];

const Dashboard = () => {

  const { total: usersTotal } = useGetList("users");
  const { total: postsTotal } = useGetList("posts");

  // Data for the chart
  const data = [
    { name: "Users", total: usersTotal || 0 },
    { name: "Posts", total: postsTotal || 0 },
  ];
  // Simulated recent users data
  const recentUsers = [
    { id: 1, name: "Alice Johnson", joined: "Feb 5, 2025" },
    { id: 2, name: "Bob Smith", joined: "Feb 6, 2025" },
    { id: 3, name: "Charlie Brown", joined: "Feb 7, 2025" },
    { id: 4, name: "Honlue Musa", joined: "Feb 7, 2025" },
    { id: 5, name: "Armel joe", joined: "Feb 7, 2025" },
  ];

  return (
    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }} gap={2} sx={{ marginTop: 4 }}>
      {/* Left Section - Stats & Chart */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>

        {/* User Card */}
        <Card className="custom-card">
        <CardContent>
          <Typography variant="h5">Total Users</Typography>
          <Typography variant="h3">{usersTotal}</Typography>
        </CardContent>
      </Card>

      {/* Posts Card */}
      <Card className="custom-card">
        <CardContent>
          <Typography variant="h5">Total Posts</Typography>
          <Typography variant="h3">{postsTotal}</Typography>
        </CardContent>
      </Card>

        {/* Custom Chart */}
        <Box gridColumn="span 2">
          <Card>
            <CardContent>
              <Typography variant="h5" align="center">
                📈 Monthly Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#4caf50" strokeWidth={2} />
                  <Line type="monotone" dataKey="posts" stroke="#f44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Right Section - Recent Users */}
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              👥 Recent Users
            </Typography>
            <List>
              {recentUsers.map((user) => (
                <ListItem key={user.id} divider>
                  <ListItemText primary={user.name} secondary={`Joined: ${user.joined}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
