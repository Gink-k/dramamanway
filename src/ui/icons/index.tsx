import React, { FC } from 'react';

type Ic = FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
export const TriangleIcons: Ic = ({ size = 24, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        {...props}
    >
        <path d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z" />
    </svg>
);
