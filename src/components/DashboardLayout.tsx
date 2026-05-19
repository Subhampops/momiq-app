import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userName?: string;
    pregnancyWeek?: number;
    currentView: string;
    onNavigate: (view: string) => void;
    onLogout?: () => void;
}

export function DashboardLayout({
    children,
    userName = 'Jyoti',
    pregnancyWeek = 14,
    currentView,
    onNavigate,
    onLogout,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const sidebarWidth = sidebarOpen ? 256 : 72;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FFF0F7', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                userName={userName}
                pregnancyWeek={pregnancyWeek}
                onNavigate={onNavigate}
                currentView={currentView}
                onLogout={onLogout}
            />

            {/* Main content — offset by sidebar, centered with maxWidth */}
            <main style={{
                flex: 1,
                minWidth: 0,
                marginLeft: sidebarWidth,
                transition: 'margin-left 0.3s cubic-bezier(0.3,0,0,1)',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div style={{ width: '100%', maxWidth: 1100, padding: '0 0 40px' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
