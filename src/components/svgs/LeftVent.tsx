import React from 'react';

export const LeftVent = ({ className, style }: { className?: string, style?: React.CSSProperties }) => {
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
                <radialGradient id="rock-internal-glow" cx="50%" cy="70%" r="80%" fx="50%" fy="90%">
                    <stop offset="0%" style={{ stopColor: '#26c6da', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#00838f', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00251a', stopOpacity: 1 }} />
                </radialGradient>

                <linearGradient id="vein-glow" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#80deea', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00bcd4', stopOpacity: 0.5 }} />
                </linearGradient>

                <radialGradient id="bubble-grad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#b2ebf2', stopOpacity: 0.1 }} />
                </radialGradient>

                <radialGradient id="microbe-grad">
                    <stop offset="0%" style={{ stopColor: '#b9f6ca', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00e676', stopOpacity: 0.6 }} />
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
            .microbe { fill: #69f0ae; }
            .twinkle-1 { animation: twinkle 3s infinite ease-in-out; }
            .twinkle-2 { animation: twinkle 4s infinite ease-in-out 1s; }
            .twinkle-3 { animation: twinkle 2.5s infinite ease-in-out 0.5s; }
            
            @keyframes twinkle {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
            }
          `}
                </style>
            </defs>

            <g transform="translate(50, 50)">
                <circle cx="200" cy="100" r="15" fill="url(#bubble-grad)">
                    <animate attributeName="cy" values="100; -50" dur="8s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="cx" values="200; 220; 190; 200" dur="8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="8s" repeatCount="indefinite" keyTimes="0; 0.2; 1" />
                    <animate attributeName="r" values="15; 20" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="180" cy="100" r="10" fill="url(#bubble-grad)">
                    <animate attributeName="cy" values="100; -50" dur="6s" repeatCount="indefinite" begin="2s" />
                    <animate attributeName="cx" values="180; 160; 190; 180" dur="6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="6s" repeatCount="indefinite" keyTimes="0; 0.2; 1" />
                </circle>
                <circle cx="220" cy="100" r="18" fill="url(#bubble-grad)">
                    <animate attributeName="cy" values="100; -50" dur="10s" repeatCount="indefinite" begin="4s" />
                    <animate attributeName="cx" values="220; 240; 210; 220" dur="10s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="10s" repeatCount="indefinite" keyTimes="0; 0.2; 1" />
                </circle>
                <circle cx="190" cy="100" r="12" fill="url(#bubble-grad)">
                    <animate attributeName="cy" values="100; -50" dur="7s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="cx" values="190; 200; 180; 190" dur="7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 0" dur="7s" repeatCount="indefinite" keyTimes="0; 0.2; 1" />
                </circle>
            </g>

            <g transform="translate(50, 50)">
                <animate attributeName="opacity" values="0.9; 1; 0.9" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />

                <path d="M 50,650 C 20,500 60,350 130,100 Q 200,70 270,100 C 340,350 380,500 350,650 L 50,650 Z"
                    fill="url(#rock-internal-glow)" stroke="#004d40" strokeWidth="3" filter="url(#biolum-bloom)" />

                <g filter="url(#biolum-bloom)" opacity="0.8" strokeLinecap="round" fill="none" strokeWidth="5">
                    <path d="M200,620 C 180,450 220,250 200,150" stroke="url(#vein-glow)" />
                    <path d="M120,550 C 140,400 100,300 130,200" stroke="url(#vein-glow)" strokeWidth="3" opacity="0.7" />
                    <path d="M280,580 C 260,420 300,320 270,220" stroke="url(#vein-glow)" strokeWidth="4" opacity="0.7" />
                </g>
            </g>

            <g transform="translate(50, 50)" filter="url(#microbe-glow)">
                <circle cx="60" cy="620" r="3" className="microbe twinkle-1" />
                <circle cx="75" cy="600" r="2" className="microbe twinkle-2" />
                <circle cx="50" cy="580" r="3" className="microbe twinkle-3" />
                <circle cx="85" cy="560" r="2" className="microbe twinkle-1" />
                <circle cx="95" cy="630" r="3" className="microbe twinkle-2" />

                <circle cx="150" cy="610" r="4" className="microbe twinkle-1" />
                <circle cx="170" cy="580" r="3" className="microbe twinkle-3" />
                <circle cx="200" cy="630" r="4" className="microbe twinkle-2" />
                <circle cx="220" cy="590" r="2" className="microbe twinkle-1" />
                <circle cx="180" cy="550" r="3" className="microbe twinkle-2" />
                <circle cx="130" cy="530" r="2" className="microbe twinkle-3" />
                <circle cx="210" cy="500" r="3" className="microbe twinkle-1" />

                <circle cx="320" cy="620" r="3" className="microbe twinkle-3" />
                <circle cx="340" cy="590" r="2" className="microbe twinkle-1" />
                <circle cx="300" cy="560" r="3" className="microbe twinkle-2" />
                <circle cx="350" cy="540" r="2" className="microbe twinkle-3" />
                <circle cx="330" cy="500" r="3" className="microbe twinkle-1" />

                <circle cx="120" cy="450" r="2" className="microbe twinkle-2" opacity="0.6" />
                <circle cx="280" cy="420" r="2" className="microbe twinkle-1" opacity="0.6" />
                <circle cx="200" cy="350" r="2" className="microbe twinkle-3" opacity="0.5" />
            </g>
        </svg>
    );
};
