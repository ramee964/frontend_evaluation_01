import { useState } from 'react'
import { Form, Input, Button, Card, message, Typography, Divider, Row, Col } from 'antd'
import './Registration.css'

const { Title, Text } = Typography

export interface RegistrationFormData {
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

function Registration() {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values: RegistrationFormData) => {
    try {
      setSubmitting(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          website: values.website,
          address: {
            street: values.address.street,
            suite: values.address.suite,
            city: values.address.city,
            zipcode: values.address.zipcode,
            geo: {
              lat: values.address.geo.lat,
              lng: values.address.geo.lng,
            },
          },
          company: {
            name: values.company.name,
            catchPhrase: values.company.catchPhrase,
            bs: values.company.bs,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create user')
      }

      await response.json()
      message.success('Account created successfully!')
      form.resetFields()
    } catch {
      message.error('Failed to create account')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="registration-container">
      <Card className="registration-card">
        <Title level={2}>Create Account</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
          Join us and start your journey
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="registration-form"
        >
          <Divider orientation="left">Personal Information</Divider>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['name']}
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['username']}
                label="Username"
                rules={[{ required: true, message: 'Please enter a username' }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['email']}
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['phone']}
                label="Phone"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={['website']}
            label="Website"
            rules={[{ required: true, message: 'Please enter your website' }]}
          >
            <Input placeholder="Enter website URL" />
          </Form.Item>

          <Divider orientation="left">Address</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['address', 'street']}
                label="Street"
                rules={[{ required: true, message: 'Please enter street address' }]}
              >
                <Input placeholder="Enter street address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['address', 'suite']}
                label="Suite/Apt"
                rules={[{ required: true, message: 'Please enter suite/apt' }]}
              >
                <Input placeholder="Enter suite/apt" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['address', 'city']}
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['address', 'zipcode']}
                label="Zipcode"
                rules={[{ required: true, message: 'Please enter zipcode' }]}
              >
                <Input placeholder="Enter zipcode" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['address', 'geo', 'lat']}
                label="Latitude"
                rules={[
                  { required: true, message: 'Please enter latitude' },
                  { pattern: /^-?\d+\.?\d*$/, message: 'Please enter a valid latitude' },
                ]}
              >
                <Input placeholder="Enter latitude" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['address', 'geo', 'lng']}
                label="Longitude"
                rules={[
                  { required: true, message: 'Please enter longitude' },
                  { pattern: /^-?\d+\.?\d*$/, message: 'Please enter a valid longitude' },
                ]}
              >
                <Input placeholder="Enter longitude" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Company</Divider>

          <Form.Item
            name={['company', 'name']}
            label="Company Name"
            rules={[{ required: true, message: 'Please enter company name' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            name={['company', 'catchPhrase']}
            label="Catch Phrase"
            rules={[{ required: true, message: 'Please enter catch phrase' }]}
          >
            <Input placeholder="Enter catch phrase" />
          </Form.Item>

          <Form.Item
            name={['company', 'bs']}
            label="Business"
            rules={[{ required: true, message: 'Please enter business description' }]}
          >
            <Input placeholder="Enter business description" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="submit-button"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Registration
