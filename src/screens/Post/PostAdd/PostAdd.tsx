import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Card, Spin, message, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { PostFormData } from '../types'
import './PostAdd.css'

const { Title, Text } = Typography
const { TextArea } = Input

interface User {
  id: number
  name: string
}

interface PostAddProps {
  onBack?: () => void
  onSuccess?: () => void
}

function PostAdd({ onBack, onSuccess }: PostAddProps) {
  const [form] = Form.useForm()
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        
        const data = await response.json()
        setUsers(data)
      } catch {
        message.error('Failed to load users')
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/')
    }
  }

  const handleSubmit = async (values: PostFormData) => {
    try {
      setSubmitting(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: values.userId,
          title: values.title,
          body: values.body,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      await response.json()
      message.success('Post created successfully!')
      form.resetFields()
      
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/')
      }
    } catch {
      message.error('Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="post-add-container">
      <Card className="post-add-card">
        {onBack && (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{ marginBottom: '24px' }}
          >
            Back to Posts
          </Button>
        )}

        <Title level={2}>Create New Post</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
          Share your thoughts with the world
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="post-add-form"
        >
          <Form.Item
            name="userId"
            label="Author"
            rules={[{ required: true, message: 'Please select a user' }]}
          >
            <Select
              placeholder="Select a user"
              loading={loadingUsers}
              notFoundContent={loadingUsers ? <Spin size="small" /> : null}
            >
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Content"
            rules={[{ required: true, message: 'Please enter post content' }]}
          >
            <TextArea
              rows={6}
              placeholder="Write your post content here..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="submit-button"
            >
              {submitting ? 'Creating Post...' : 'Create Post'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default PostAdd
