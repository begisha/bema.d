import React, { useEffect } from 'react';
import { Layout, Card, Avatar, Button, Input, List, Typography, message, ConfigProvider } from 'antd';
import { UserOutlined, LogoutOutlined, SendOutlined } from '@ant-design/icons';
import { useCategoryStore } from '../store/categoryStore';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const { categories, getCategories, createCategory } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    message.success('До встречи!');
    navigate('/login');
  };

  const onAddCategory = async (value) => {
    if (!value.trim()) return message.warning('Напишите название');
    await createCategory(value);
    message.success('Добавлено');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 16,
        },
      }}
    >
      <Layout style={{ 
        minHeight: '100vh', 
        width: '100vw', 
        background: 'radial-gradient(circle at top right, #1e1e2f, #0f0f1a)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',   
        justifyContent: 'center', 
        padding: '20px',
        margin: 0,
        overflowX: 'hidden' 
      }}>
        <Content style={{ 
          maxWidth: '480px', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center' 
        }}>
          
         
          <Card 
            bordered={false} 
            style={{ 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(10px)',
              textAlign: 'center', 
              marginBottom: '30px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Avatar 
              size={100} 
              icon={<UserOutlined />} 
              style={{ 
                backgroundColor: '#6366f1', 
                marginBottom: '15px',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' 
              }} 
            />
            <Title level={2} style={{ color: '#fff', margin: 0, letterSpacing: '1px' }}>
              MY PROFILE (Begimay)

            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '20px' }}>
            Administrator
            </Text>
            
            <Button 
              type="primary" 
              danger 
              ghost
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              style={{ borderRadius: '10px', border: '1px solid #ff4d4f' }}
            >
              LOGOUT
            </Button>
          </Card>

          <div style={{ width: '100%' }}>
            <Input.Search
              placeholder="Введите новую категорию..."
              allowClear
              enterButton={<SendOutlined />}
              size="large"
              onSearch={onAddCategory}
              style={{ marginBottom: '25px' }}
            />

            <List
              dataSource={categories}
              style={{ width: '100%' }}
              renderItem={(item) => (
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '10px',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textAlign: 'center'
                }}>
                  <Text style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>
                    {item.title}
                  </Text>
                </div>
              )}
            />
          </div>

        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Profile;