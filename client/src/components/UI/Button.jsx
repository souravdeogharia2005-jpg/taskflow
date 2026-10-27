import React from 'react';

const Button = ({
  children, variant = 'primary', size = 'md',
  onClick, disabled, loading, type = 'button',
  className = '', ...rest
}) => {
  const cls = `btn btn--${variant} btn--${size} ${className} ${loading ? 'btn--loading' : ''}`.trim();
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled || loading} {...rest}>
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
};
export default Button;
