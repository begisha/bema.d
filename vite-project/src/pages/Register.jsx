import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function Register() {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const dataToSend = { 
        ...values, 
        avatar: "user_avatar_1" 
      };
      
      await register(dataToSend);
      message.success('Регистрация успешна!');
      navigate('/login');
    } catch (err) {
      message.error('Ошибка при регистрации');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', 
      margin: 0
    }}>
      <Card 
        style={{ 
          width: 400, 
          borderRadius: 15, 
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          padding: '10px' 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Регистрация</Title>
          <Text type="secondary">Создайте новый аккаунт</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item 
            label="Имя пользователя" 
            name="username" 
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input size="large" placeholder="Ваше имя" />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[{ required: true, type: 'email', message: 'Введите почту!' }]}
          >
            <Input size="large" placeholder="mail@example.com" />
          </Form.Item>

          <Form.Item 
            label="Пароль" 
            name="password" 
            rules={[{ required: true, min: 6, message: 'Минимум 6 символов!' }]}
          >
            <Input.Password size="large" placeholder="******" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={isLoading} style={{ borderRadius: 8 }}>
            Создать аккаунт
          </Button>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            Уже есть профиль? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}