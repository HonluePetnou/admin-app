import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { PostList } from "./pages/Posts/PostsLists";
import { UserList } from "./pages/Users/UsersLists";
import { UserShow } from "./pages/Users/ShowUsers";
import { PostShow } from "./pages/Posts/ShowPosts";
import { PostEdit } from "./pages/Posts/EdithPosts";
import { UserEdit } from "./pages/Users/EdithUsers";
import CreateUser from "./pages/Users/CreateUsers";
import CreatePost from "./pages/Posts/CreatePosts";
import { authProvider } from "./authProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import { GroupOutlined, PostAdd } from "@mui/icons-material";




export const App = () => (
  <Admin 
  layout={Layout} 
  dataProvider={dataProvider} 
  dashboard={Dashboard} 
  authProvider={authProvider}
  >
    <Resource name="users" icon={GroupOutlined}  list={UserList} edit={UserEdit} show={UserShow} create={CreateUser}/>
    <Resource name="posts" icon={PostAdd} list={PostList} edit={PostEdit} show={PostShow} create={CreatePost}/>
  </Admin>
);
