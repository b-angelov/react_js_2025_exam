export function LikeStar({ size = 24, className = "", ...props }) {
    return (
        <svg
            viewBox="-260 -260 520 520"
            width={size}
            height={size}
            aria-hidden="true"
            focusable="false"
            className={className}
            {...props}
        >
            <defs>
                <path
                    id="rayL"
                    d="M -24 -58
             Q -30 -120 -18 -182
             Q  -9 -220  -5 -232
             L   0  -250
             L   6  -231
             Q  12 -218  21 -182
             Q  34 -120  26  -58
             Q  15  -40   0  -34
             Q -14  -40 -24  -58 Z"
                />
                <path
                    id="rayS"
                    d="M -19 -54
             Q -23  -98 -14 -140
             Q  -8 -166  -4 -176
             L   0 -194
             L   5 -176
             Q   9 -166  16 -140
             Q  25  -98  21  -54
             Q  12  -40   0  -35
             Q -11  -40 -19  -54 Z"
                />
                <mask id="centerHole">
                    <rect x="-400" y="-400" width="800" height="800" fill="white" />
                    {/* Hole radius: tweak this to taste */}
                    <circle cx="0" cy="8" r="52" fill="black" />
                </mask>
            </defs>

            <g transform="skewX(-10)" mask="url(#centerHole)" fill="currentColor">
                {/* 4 long rays */}
                <use href="#rayL" transform="rotate(0)" />
                <use href="#rayL" transform="rotate(90)" />
                <use href="#rayL" transform="rotate(180)" />
                <use href="#rayL" transform="rotate(270)" />

                {/* 4 short rays */}
                <use href="#rayS" transform="rotate(45)" />
                <use href="#rayS" transform="rotate(135)" />
                <use href="#rayS" transform="rotate(225)" />
                <use href="#rayS" transform="rotate(315)" />

                {/* soft “ink pool” ring (still cut by mask) */}
                <path
                    d="M 0 -62
             C 42 -62 78 -32 78 8
             C 78 54 40 88 0 88
             C -48 88 -84 54 -84 12
             C -84 -32 -48 -62 0 -62 Z"
                />
            </g>
        </svg>
    );
}
