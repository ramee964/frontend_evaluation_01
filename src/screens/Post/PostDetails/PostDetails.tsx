import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Typography, Tag, Button, Spin, message, Statistic, Row, Col } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { Post } from '../types'
import './PostDetails.css'

const { Title, Text } = Typography

interface PostDetailsProps {
  postId?: number
  post?: Post
  onBack?: () => void
}

function PostDetails({ postId: propPostId, post: initialPost, onBack }: PostDetailsProps) {
  const { id: routeId } = useParams<{ id: string }>()
  const postId = propPostId || (routeId ? parseInt(routeId, 10) : undefined)
  const navigate = useNavigate()
  
  const [post, setPost] = useState<Post | null>(initialPost || null)
  const [loading, setLoading] = useState(!initialPost)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (postId && !initialPost) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          setError(null)
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch post')
          }
          
          const data = await response.json()
          setPost(data)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch post'
          setError(errorMessage)
          message.error(errorMessage)
        } finally {
          setLoading(false)
        }
      }

      fetchPost()
    }
  }, [postId, initialPost])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/')
    }
  }

  if (loading) {
    return (
      <div className="post-details-container">
        <div className="loading-container">
          <Spin size="large" />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-details-container">
        <Card>
          <Text type="danger">{error || 'Post not found'}</Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="post-details-container">
      <Card className="post-details-card">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{ marginBottom: '24px' }}
        >
          Back to Posts
        </Button>

        <div className="post-details-header">
          <div>
            <Tag color="blue">Post #{post.id}</Tag>
            <Tag color="blue">User {post.userId}</Tag>
          </div>
        </div>

        <Title level={1} className="post-details-title">
          {post.title}
        </Title>

        <div className="post-details-body-section">
          <Text strong className="post-details-label">Content</Text>
          <div className="post-details-body">
            {post.body.split('\n').map((line, index) => (
              <Text key={index} className="post-body-line">
                {line}
              </Text>
            ))}
          </div>
        </div>

        <div className="post-details-footer">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Post ID"
                value={post.id}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Author ID"
                value={post.userId}
              />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default PostDetails
