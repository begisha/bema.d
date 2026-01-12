import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function Login() {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values);
      message.success('Welcomeeeeee !');
      navigate('/');
    } catch (err) {
      message.error('Ошибка входа. Проверьте данные');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
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
          <Title level={2}>Вход</Title>
          <Text type="secondary">Введите логин и пароль</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password size="large" placeholder="******" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={isLoading} style={{ borderRadius: 8 }}>
            Войти
          </Button>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            Нет аккаунта? <Link to="/registr">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}