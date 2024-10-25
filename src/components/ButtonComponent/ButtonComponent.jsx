const ButtonComponent = ({
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            {...props}>
            {children}
        </button>
    )
}

export default ButtonComponent
