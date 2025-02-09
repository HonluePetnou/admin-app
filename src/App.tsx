import {
  Admin,
  Resource,
  radiantDarkTheme,
  radiantLightTheme
} from "react-admin";

import { dataProvider } from "./provider/dataProvider";
import { PostList } from "./pages/Posts/PostsLists";
import { UserList } from "./pages/Users/UsersLists";
import { UserShow } from "./pages/Users/ShowUsers";
import { PostShow } from "./pages/Posts/ShowPosts";
import { PostEdit } from "./pages/Posts/EdithPosts";
import { UserEdit } from "./pages/Users/EdithUsers";
import CreateUser from "./pages/Users/CreateUsers";
import CreatePost from "./pages/Posts/CreatePosts";
import { authProvider } from "./provider/authProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import { GroupOutlined, PostAdd } from "@mui/icons-material";
import { MyLayout } from "./pages/layout";


export const App = () => (
  <Admin 
  layout={MyLayout} 
  dataProvider={dataProvider} 
  theme={radiantLightTheme}
  darkTheme={radiantDarkTheme}
  dashboard={Dashboard}
  authProvider={authProvider}
  >
    <Resource name="users" icon={GroupOutlined}  list={UserList} edit={UserEdit} show={UserShow} create={CreateUser}/>
    <Resource name="posts" icon={PostAdd} list={PostList} edit={PostEdit} show={PostShow} create={CreatePost}/>
  </Admin>
);

export default App;
