import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useGetList } from "react-admin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Définition des types
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  status: string; // Ajout du statut des articles ("published" ou "draft")
}

// Couleurs pour le camembert
const COLORS = ["#f44336","#5850EC"];

// Données fictives pour le graphique de croissance
const chartData = [
  { month: "Jan", users: 400, posts: 240 },
  { month: "Feb", users: 600, posts: 320 },
  { month: "Mar", users: 800, posts: 450 },
  { month: "Apr", users: 700, posts: 500 },
  { month: "May", users: 1000, posts: 620 },
];

const Dashboard: React.FC = () => {
  const { data: users = [], total: usersTotal = 0, isLoading: loadingUsers } = useGetList<User>("users");
  const { data: posts = [], total: postsTotal = 0, isLoading: loadingPosts } = useGetList<Post>("posts");

  // Stocker les utilisateurs récents dynamiquement
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [postStatusStats, setPostStatusStats] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (users.length > 0) {
      // Trier les utilisateurs par ID (du plus récent au plus ancien)
      const sortedUsers = [...users].sort((a, b) => b.id - a.id);
      setRecentUsers(sortedUsers.slice(0, 5)); // Prendre les 5 derniers utilisateurs
    }

    if (posts.length > 0) {
      // Calcul du nombre d'articles publiés et brouillons
      const publishedCount = posts.filter((post) => post.status === "published").length;
      const draftCount = posts.length - publishedCount;
      setPostStatusStats([
        { name: "Publié", value: publishedCount },
        { name: "Brouillon", value: draftCount },
      ]);
    }
  }, [users, posts]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
      gap={2}
      sx={{ marginTop: 4 }}
    >
      {/* 📊 Section Gauche - Statistiques & Graphique */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={2}
      >
        {/* Total Users */}
        <Card>
          <CardContent>
            <Typography variant="h5">Total Users</Typography>
            {loadingUsers ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3">{usersTotal}</Typography>
            )}
          </CardContent>
        </Card>

        {/* Total Posts */}
        <Card>
          <CardContent>
            <Typography variant="h5">Total Posts</Typography>
            {loadingPosts ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3">{postsTotal}</Typography>
            )}
          </CardContent>
        </Card>

        {/* 📈 Graphique de croissance */}
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#BF125D"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#7E3AF2"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* 📌 Graphique en camembert : Répartition Publié/Brouillon */}
        <Box gridColumn="span 2">
          <Card>
            <CardContent>
              <Typography variant="h5" align="center">
                📌 Répartition des Articles
              </Typography>
              {loadingPosts ? (
                <CircularProgress />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={postStatusStats}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {postStatusStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* 👥 Section Droite - Derniers utilisateurs */}
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              👥 Recent Users
            </Typography>
            {loadingUsers ? (
              <CircularProgress />
            ) : (
              <List>
                {recentUsers.map((user) => (
                  <ListItem key={user.id} divider>
                    <ListItemText
                      primary={user.name}
                      secondary={`ID: ${user.id}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
