import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('Super Admin');
    const [password, setPassword] = useState('password12345');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <>
            <main className="flex">
                <Container className="h-screen flex items-center justify-center flex-1">
                    <Paper shadow="xs" className="w-full max-w-md m-auto" style={{ boxShadow: "none" }}>
                        <div className="mb-5">
                            <img src="https://www.jasamarga.com/static/media/Logo.282998ca.png" alt="jasamarga-logo" className="w-48 object-contain mb-5" />
                            <Title order={3} className="opacity-80 block">Selamat Datang Kembali, Silakan Masuk!</Title>
                        </div>
                        <TextInput
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            style={{ marginBottom: '10px' }}
                            placeholder="johndoi"
                        />
                        <PasswordInput
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            style={{ marginBottom: '10px' }}
                            placeholder="****"
                        />
                        {error && <div className="mb-5 text-rose-500">{error}</div>}

                        <Button variant="filled" color="indigo" fullWidth className="mt-5" onClick={handleLogin}>Login</Button>
                    </Paper>
                </Container>
                <section style={{ backgroundImage: 'url("/assets/img/background-tanjung.jpg")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="flex-auto h-screen hidden md:block relative">
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/35 text-slate-100 flex items-center justify-center hover:text-white transition-colors shadow-2xl">
                        <Title className="max-w-2xl">The First and The Biggest Toll Road Operator in Indonesia </Title>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login