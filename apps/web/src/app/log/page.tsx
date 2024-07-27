'use client';

import { useState, useEffect } from 'react';
import { ILogin } from '@/interfaces/login.interface';
import {
    Box,
    Container,
    Avatar,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/features/authSlice';
import ErrorIcon from '@mui/icons-material/Error';
import LoginForm from './logForm';
import LoginDialog from './logDialog';
import WelcomeDialog from './wlcDialog';


const initialValues: ILogin = {
    username: '',
    password: '',
};

function Login() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [greetingOpen, setGreetingOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { loginStatus, user } = useAppSelector((state) => state.auth);

    const handleSubmit = async (
        values: ILogin,
        actions: any,
    ) => {
        const { username, password } = values;

        try {
            await dispatch(login({ password, username }));
            if (loginStatus.isLogin) {
                setGreetingOpen(true);
                setTimeout(() => {
                    setGreetingOpen(false);
                    router.push('/');
                }, 3000)
            }
        } catch (error) {
            console.error(error);
            setOpen(true);
            actions.setSubmitting(false);
        }
    };

    useEffect(() => {
        if (loginStatus.isLogin) {
            setGreetingOpen(true);
            setTimeout(() => {
                setGreetingOpen(false);
                router.push('/');
            }, 3000);
        }
    },
        [loginStatus.isLogin, router]
    );

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                margin: 0,
                minHeight: '100vh',
                width: '100vw',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'absolute',
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: '#f1f1f1',
                        width: 60,
                        height: 60,
                    }}
                >
                    <ErrorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <LoginForm initialValues={initialValues} handleSubmit={handleSubmit} />
            </Box>
            <LoginDialog open={open} handleClose={handleClose} />
            <WelcomeDialog
                open={greetingOpen}
                username={user?.username}
                onClose={() => setGreetingOpen(false)}
            />
        </Container>
    );
}

export default Login;