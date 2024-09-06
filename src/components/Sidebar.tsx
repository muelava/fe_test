import { NavLink } from '@mantine/core';
import { IconChartBar, IconHome, IconSettings } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';


export function Sidebar() {
    let location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <NavLink leftSection={<IconHome size="1rem" stroke={1.5} />}
                label="Dashboard"
                component={Link}
                to="/dashboard"
                active={isActive("/dashboard")}
                variant='subtle'
            />

            <NavLink
                href="#"
                label="Laporan Lalin"
                leftSection={<IconChartBar size="1rem" stroke={1.5} />}
                childrenOffset={28}
                defaultOpened={false}
                active={isActive("/dashboard/laporan-perhari")}
            >
                <NavLink label="Laporan Per Hari" component={Link}
                    to="/dashboard/laporan-perhari"
                    active={isActive("/dashboard/laporan-perhari")}
                />
            </NavLink>
            <NavLink leftSection={<IconSettings size="1rem" stroke={1.5} />}
                label="Master Gerbang"
                component={Link}
                to="/dashboard/master-gerbang"
                active={isActive("/dashboard/master-gerbang")}
            />
        </>
    );
}