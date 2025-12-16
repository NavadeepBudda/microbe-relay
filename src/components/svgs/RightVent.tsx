import React from 'react';

export const RightVent = ({ className, style }: { className?: string, style?: React.CSSProperties }) => {
    return (
        <svg
            width="500"
            height="700"
            viewBox="0 0 500 700"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ background: 'transparent', ...style }}
        >
            <defs>
                <radialGradient id="rock-danger-glow" cx="50%" cy="70%" r="80%" fx="50%" fy="90%">
                    <stop offset="0%" style={{ stopColor: '#ff5722', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#bf360c', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3e2723', stopOpacity: 1 }} />
                </radialGradient>

                <linearGradient id="fissure-glow" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#ffab00', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ff3d00', stopOpacity: 0.8 }} />
                </linearGradient>

                <radialGradient id="toxic-bubble-grad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" style={{ stopColor: '#ffccbc', stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: '#bf360c', stopOpacity: 0.4 }} />
                </radialGradient>

                <radialGradient id="stressed-microbe-grad">
                    <stop offset="0%" style={{ stopColor: '#ffea00', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ff9100', stopOpacity: 0.7 }} />
                </radialGradient>

                <filter id="biolum-bloom" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="microbe-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>

                <style>
                    {`
                /* Rapid flickering for pressure cracks */
                @keyframes flicker {
                    0%, 100% { opacity: 0.8; stroke-width: 4; }
                    50% { opacity: 1; stroke-width: 6; filter: brightness(1.2); }
                }
                .crack-flicker { animation: flicker 0.5s infinite ease-in-out; }

                /* Jittery vibration for stressed microbes */
                @keyframes vibrate {
                    0% { transform: translate(0,0); }
                    20% { transform: translate(-2px, 1px); }
                    40% { transform: translate(1px, -2px); }
                    60% { transform: translate(-1px, 2px); }
                    80% { transform: translate(2px, -1px); }
                    100% { transform: translate(0,0); }
                }
                .microbe-jitter { animation: vibrate 0.3s infinite linear; fill: url(#stressed-microbe-grad); }
            `}
                </style>
            </defs>

            <g transform="translate(50, 50)">

                <circle cx="200" cy="100" r="12" fill="url(#toxic-bubble-grad)">
                    <animate attributeName="cy" values="100; -100" dur="2s" repeatCount="indefinite" begin="0s" calcMode="linear" />
                    <animate attributeName="cx" values="200; 195; 205; 200" dur="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" keyTimes="0; 0.1; 1" />
                </circle>
                <circle cx="180" cy="100" r="10" fill="url(#toxic-bubble-grad)">
                    <animate attributeName="cy" values="100; -100" dur="2.5s" repeatCount="indefinite" begin="0.5s" calcMode="linear" />
                    <animate attributeName="cx" values="180; 185; 175; 180" dur="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="2.5s" repeatCount="indefinite" keyTimes="0; 0.1; 1" />
                </circle>

                <circle cx="110" cy="300" r="8" fill="url(#toxic-bubble-grad)">
                    <animate attributeName="cy" values="300; 100" dur="3s" repeatCount="indefinite" begin="1s" calcMode="linear" />
                    <animate attributeName="cx" values="110; 100; 120" dur="3s" repeatCount="indefinite" calcMode="linear" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="3s" repeatCount="indefinite" keyTimes="0; 0.1; 1" />
                </circle>

                <circle cx="290" cy="400" r="9" fill="url(#toxic-bubble-grad)">
                    <animate attributeName="cy" values="400; 200" dur="2.8s" repeatCount="indefinite" begin="0.2s" calcMode="linear" />
                    <animate attributeName="cx" values="290; 310; 300" dur="2.8s" repeatCount="indefinite" calcMode="linear" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="2.8s" repeatCount="indefinite" keyTimes="0; 0.1; 1" />
                </circle>
            </g>

            <g transform="translate(50, 50)">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1,0; 0,1; 0,0" dur="0.2s" repeatCount="indefinite" />

                <path d="M 40,650 L 20,550 L 70,400 L 110,250 L 150,100 L 250,80 L 320,120 L 360,300 L 330,450 L 370,600 L 340,650 Z"
                    fill="url(#rock-danger-glow)" stroke="#3e2723" strokeWidth="4" strokeLinejoin="bevel" filter="url(#biolum-bloom)" />

                <g filter="url(#biolum-bloom)" strokeLinecap="square" fill="none" stroke="url(#fissure-glow)" className="crack-flicker">
                    <path d="M200,630 L 180,500 L 220,400 L 160,250 L 190,120" />
                    <path d="M110,300 L 80,350 L 120,450" />
                    <path d="M320,200 L 290,350 L 330,500" />
                </g>
            </g>

            <g transform="translate(50, 50)" filter="url(#microbe-glow)">
                <circle cx="170" cy="610" r="3" className="microbe-jitter" />
                <circle cx="190" cy="580" r="2" className="microbe-jitter" style={{ animationDelay: '0.1s' }} />
                <circle cx="210" cy="620" r="3" className="microbe-jitter" style={{ animationDelay: '0.2s' }} />

                <circle cx="100" cy="320" r="3" className="microbe-jitter" style={{ animationDelay: '0.05s' }} />
                <circle cx="120" cy="340" r="2" className="microbe-jitter" style={{ animationDelay: '0.15s' }} />

                <circle cx="300" cy="360" r="3" className="microbe-jitter" style={{ animationDelay: '0.1s' }} />
                <circle cx="330" cy="380" r="2" className="microbe-jitter" style={{ animationDelay: '0.25s' }} />
                <circle cx="310" cy="220" r="2" className="microbe-jitter" opacity="0.7" />
            </g>
        </svg>
    );
};
