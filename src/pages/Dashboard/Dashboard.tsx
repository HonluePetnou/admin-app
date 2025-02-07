import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useGetList } from 'react-admin';

const Dashboard = () => {
  const { total: usersTotal } = useGetList('users');
  const { total: postsTotal } = useGetList('posts');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h5" component="div">
              Nombre d'utilisateurs
            </Typography>
            <Typography variant="h3" component="div">
              {usersTotal}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h5" component="div">
              Nombre d'articles
            </Typography>
            <Typography variant="h3" component="div">
              {postsTotal}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;