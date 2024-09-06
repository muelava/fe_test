import { AppShell, Avatar, Burger, Group, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { IconLogout } from '@tabler/icons-react';

export function BasicAppShell() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <img src="https://www.jasamarga.com/static/media/Logo.282998ca.png" alt="jasamarga-logo" className="w-36 h-auto object-contain" />

                    <UnstyledButton className='ms-auto'>
                        <Menu width={200} shadow="md">
                            <Menu.Target>
                                <Avatar color="cyan" className='ms-auto' radius="xl"></Avatar>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item component="a" href="#">
                                    Account
                                </Menu.Item>
                                <Menu.Item leftSection={<IconLogout size="16" />} color='red' onClick={handleLogout}>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </UnstyledButton>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">

                {/* Sidebar */}
                <Sidebar />

            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
