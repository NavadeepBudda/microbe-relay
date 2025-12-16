import React from 'react';

export const GoodGuyHuggingCO2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }} {...props}>
        <defs>
            <radialGradient id="good-guy-glow-hug" cx="30%" cy="30%" r="80%" fx="20%" fy="20%">
                <stop offset="0%" style={{ stopColor: '#dfffee', stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: '#64ffda', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1de9b6', stopOpacity: 1 }} />
            </radialGradient>

            <radialGradient id="internal-bubble-glow-hug" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#64ffda', stopOpacity: 0.1 }} />
            </radialGradient>

            <radialGradient id="co2-bubble-grad" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                <stop offset="80%" style={{ stopColor: '#e1f5fe', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#b3e5fc', stopOpacity: 0.6 }} />
            </radialGradient>

            <filter id="biolum-glow-hug" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.4  0 1 0 0 0.9  0 0 1 0 0.7  0 0 0 1 0" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="blush-blur-hug">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
        </defs>

        <g transform="translate(250, 200)">

            <g transform="translate(60, 0)">
                <circle r="90" fill="url(#co2-bubble-grad)" stroke="#ffffff" strokeWidth="3" />
                <ellipse cx="-40" cy="-40" rx="20" ry="12" fill="white" opacity="0.7" transform="rotate(-30)" />
                <text x="0" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#0277bd" style={{ letterSpacing: '-1px' }}>
                    CO<tspan dy="10" fontSize="24">2</tspan>
                </text>
            </g>

            <g transform="translate(-50, 0)">
                <path d="M-20,-130 C-80,-140 -160,-80 -170,10 C-180,100 -100,160 0,150 C60,140 80,80 80,0 C80,-80 50,-120 -20,-130 Z"
                    fill="url(#good-guy-glow-hug)"
                    filter="url(#biolum-glow-hug)"
                    stroke="#00bfa5" strokeWidth="2" strokeOpacity="0.3" />

                <circle cx="-90" cy="-50" r="20" fill="url(#internal-bubble-glow-hug)" />
                <circle cx="-30" cy="80" r="15" fill="url(#internal-bubble-glow-hug)" />

                <g transform="translate(20, 10) rotate(5)">
                    <ellipse cx="-50" cy="20" rx="15" ry="10" fill="#ff80ab" opacity="0.5" filter="url(#blush-blur-hug)" />
                    <ellipse cx="50" cy="20" rx="18" ry="12" fill="#ff80ab" opacity="0.6" filter="url(#blush-blur-hug)" />

                    <g fill="#004d40">
                        <ellipse cx="-40" cy="-10" rx="10" ry="14" transform="rotate(-5)" />
                        <ellipse cx="40" cy="-10" rx="10" ry="14" transform="rotate(5)" />
                    </g>
                    <g fill="#ffffff">
                        <circle cx="-36" cy="-16" r="4" />
                        <circle cx="44" cy="-16" r="4" />
                    </g>

                    <path d="M-20,25 Q0,35 20,25" fill="none" stroke="#004d40" strokeWidth="4" strokeLinecap="round" />
                </g>
            </g>

        </g>
    </svg>
);
