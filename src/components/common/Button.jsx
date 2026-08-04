const Button = ({
    children,
    className = "",
    ...props
}) => {
    return (
        <button
            {...props}
            className={`rounded bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;