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

export const CatLogo: Ic = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 752.000000 752.000000"
        preserveAspectRatio="xMidYMid meet"
        width={size}
        height={size}
        fill="#000000"
        {...props}
    >
        <g
            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
            stroke="none"
        >
            <path d="M2635 4878 c-41 -22 -70 -56 -145 -169 -225 -338 -388 -780 -474 -1277 -13 -79 -26 -145 -28 -146 -1 -1 -46 -9 -98 -18 -176 -29 -276 -85 -323 -179 -14 -30 -28 -62 -31 -71 -4 -15 -17 -18 -66 -18 -55 0 -61 -2 -72 -26 -18 -39 16 -64 88 -64 49 0 55 -2 69 -30 21 -40 55 -61 123 -74 53 -11 58 -15 75 -51 11 -22 29 -51 40 -63 57 -62 162 -80 237 -42 38 20 90 76 90 98 0 18 9 15 41 -13 53 -44 141 -45 194 -3 32 25 75 111 75 151 l0 27 1309 0 1308 0 7 -41 c9 -58 40 -113 78 -141 49 -34 132 -33 184 4 l39 28 14 -28 c20 -41 42 -62 83 -83 41 -21 120 -25 165 -8 40 15 101 77 108 110 8 36 21 45 75 54 62 10 96 30 123 70 22 34 23 35 93 35 55 0 77 4 95 19 21 16 22 22 11 45 -11 25 -15 26 -91 26 l-79 0 -17 49 c-42 127 -191 210 -407 228 l-77 6 -7 46 c-59 425 -179 810 -374 1206 -102 205 -151 280 -209 316 -73 47 -138 39 -210 -27 -40 -35 -168 -204 -211 -276 -19 -33 -24 -36 -46 -28 -62 24 -230 61 -344 76 -99 13 -180 15 -390 11 -286 -5 -395 -18 -529 -63 -42 -14 -77 -22 -78 -17 -2 4 -24 46 -51 92 -53 95 -174 227 -234 254 -41 19 -103 22 -133 5z m133 -105 c52 -39 148 -167 187 -247 19 -40 35 -78 35 -84 0 -25 50 -24 113 1 154 62 294 80 622 80 278 1 408 -15 606 -74 54 -16 106 -29 116 -29 12 0 31 22 53 58 54 91 177 258 211 286 20 17 43 26 64 26 55 0 93 -51 194 -254 203 -413 305 -713 371 -1100 24 -139 25 -166 7 -166 -8 0 -41 -14 -75 -30 -73 -37 -161 -128 -188 -194 l-19 -46 -620 2 -620 3 -13 164 -13 163 66 68 c53 56 65 74 65 101 0 70 -40 81 -201 55 -102 -17 -127 -28 -135 -61 -10 -42 3 -70 64 -132 l59 -59 7 -119 c4 -66 9 -135 13 -152 l5 -33 -661 0 -660 0 -27 55 c-48 102 -154 187 -268 216 l-47 12 6 41 c37 239 121 571 195 772 81 219 279 589 362 677 32 34 41 38 65 32 15 -3 43 -18 61 -32z m-626 -1599 c63 -21 140 -91 172 -156 30 -60 35 -142 11 -187 -36 -71 -126 -46 -174 46 -6 13 -20 27 -31 33 -28 15 -56 -16 -65 -71 -11 -65 -32 -99 -72 -115 -65 -28 -129 5 -153 76 -18 53 -48 76 -112 85 -85 12 -117 64 -87 142 48 127 331 209 511 147z m3432 11 c192 -34 286 -104 286 -214 0 -50 -31 -76 -99 -86 -64 -9 -79 -21 -110 -86 -62 -130 -194 -111 -222 30 -19 96 -66 114 -105 39 -40 -78 -109 -101 -155 -52 -21 22 -24 35 -24 97 0 60 4 80 27 119 48 80 131 140 221 157 63 13 86 12 181 -4z" />
            <path d="M2705 4650 c-33 -13 -63 -52 -99 -130 -34 -74 -66 -180 -66 -218 0 -27 25 -45 53 -38 20 5 27 19 47 93 24 89 76 203 97 210 6 2 25 -32 45 -79 65 -162 86 -189 123 -158 23 19 18 46 -33 170 -38 93 -53 119 -81 137 -36 24 -53 27 -86 13z" />
            <path d="M4727 4614 c-16 -8 -55 -56 -88 -106 -46 -71 -59 -99 -57 -122 3 -26 8 -31 33 -34 28 -3 33 3 73 70 57 96 77 122 90 114 10 -6 42 -136 59 -240 14 -84 75 -91 81 -9 4 55 -35 240 -60 284 -32 57 -78 72 -131 43z" />
            <path d="M3200 4171 c-89 -29 -171 -96 -205 -166 -11 -23 -21 -69 -23 -107 -10 -156 84 -284 237 -324 141 -36 274 34 338 176 25 55 23 194 -3 251 -28 60 -87 125 -138 151 -45 23 -162 34 -206 19z m-7 -194 c9 -136 33 -187 89 -187 58 0 73 33 86 194 l7 89 32 -27 c47 -39 73 -101 73 -172 -1 -177 -166 -277 -314 -190 -131 77 -144 287 -24 365 18 11 36 21 39 21 3 0 9 -42 12 -93z" />
            <path d="M4124 4166 c-53 -17 -126 -67 -158 -109 -94 -123 -73 -304 46 -412 118 -106 297 -106 403 0 129 130 119 358 -21 473 -70 58 -177 77 -270 48z m16 -213 c0 -127 9 -160 49 -179 60 -30 105 39 124 192 l13 99 27 -28 c109 -108 78 -307 -57 -368 -55 -25 -111 -23 -172 5 -152 71 -176 294 -41 376 55 34 57 31 57 -97z" />
            <path d="M2523 3648 c-30 -34 -34 -55 -19 -91 32 -74 160 -146 274 -154 58 -4 71 -2 95 17 33 26 37 80 8 124 -43 65 -181 126 -285 126 -42 0 -57 -5 -73 -22z" />
            <path d="M4685 3561 c-153 -55 -223 -130 -191 -206 11 -26 23 -36 51 -44 95 -26 303 62 342 145 16 32 15 37 0 69 -27 58 -103 71 -202 36z" />
        </g>
    </svg>
);

export const CrossIcon: Ic = ({ size = '24px', fill = 'black', ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        fill={fill}
        width={size}
        height={size}
        {...props}
    >
        <title>cross</title>
        <g id="Page-1" strokeWidth="1" fillRule="evenodd">
            <g
                id="Icon-Set-Filled"
                transform="translate(-469.000000, -1041.000000)"
            >
                <path
                    d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                    id="cross"
                ></path>
            </g>
        </g>
    </svg>
);

export const CopyIcon: Ic = ({
    size = '24px',
    fill = 'transparent',
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={fill}
        width={size}
        height={size}
        stroke="#1C274C"
        strokeWidth="1.5"
        {...props}
    >
        <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" />
        <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" />
    </svg>
);
