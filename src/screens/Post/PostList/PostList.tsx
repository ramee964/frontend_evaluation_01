import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, Card, Button, Avatar, Spin, message, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { Post } from '../types'
import './PostList.css'

const { Title, Text } = Typography
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

interface PostListProps {
  onAddPost?: () => void
  onViewPost?: (post: Post) => void
}

function PostList({ onAddPost, onViewPost }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts'
        setError(errorMessage)
        message.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleAddPost = () => {
    if (onAddPost) {
      onAddPost()
    } else {
      navigate('/add-post')
    }
  }

  const handleViewPost = (post: Post) => {
    if (onViewPost) {
      onViewPost(post)
    } else {
      navigate(`/posts/${post.id}`)
    }
  }

  if (loading) {
    return (
      <div className="post-list-container">
        <div className="loading-container">
          <Spin size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="post-list-container">
        <Card>
          <Text type="danger">{error}</Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <div>
          <Title level={2}>Posts</Title>
          <Text type="secondary">Browse all posts</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddPost}
          className="add-post-button"
        >
          New Post
        </Button>
      </div>

      <Card className="posts-card">
        <List
          dataSource={posts}
          renderItem={(post) => (
            <List.Item className="post-item">
              <List.Item.Meta
                avatar={
                  <Avatar className="post-avatar">{post.id}</Avatar>
                }
                title={
                  <Text
                    className="post-title-text"
                    onClick={() => handleViewPost(post)}
                  >
                    {post.title}
                  </Text>
                }
                description={
                  <Text className="post-body-preview">{post.body}</Text>
                }
              />
              <Button
                type="primary"
                onClick={() => handleViewPost(post)}
              >
                View
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default PostList
