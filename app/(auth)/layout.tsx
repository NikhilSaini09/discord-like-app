const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center bg-white dark:bg-[#313338]">
            {children}
        </div>
    );
}

export default AuthLayout;{}