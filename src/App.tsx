import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import PostList from './screens/Post/PostList'
import PostAdd from './screens/Post/PostAdd'
import PostDetails from './screens/Post/PostDetails'
import Registration from './screens/Registration'
import './App.css'

const { Header, Content } = Layout

function AppContent() {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Posts</Link>,
    },
    {
      key: '/add-post',
      icon: <PlusOutlined />,
      label: <Link to="/add-post">Add Post</Link>,
    },
    {
      key: '/register',
      icon: <UserAddOutlined />,
      label: <Link to="/register">Register</Link>,
    },
  ]

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="app-menu"
        />
      </Header>
      <Content className="app-content">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/add-post" element={<PostAdd />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Content>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
