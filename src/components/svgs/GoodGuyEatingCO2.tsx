import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
    moleculeType?: 'CO2' | 'N2O' | 'N2';
}

export const GoodGuyEatingCO2: React.FC<Props> = ({ moleculeType = 'CO2', ...props }) => {

    // Determine the text elements based on molecule type
    const renderMoleculeText = () => {
        if (moleculeType === 'N2O') {
            return (
                <text x="0" y="10" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#00695c" opacity="0.6">
                    N<tspan dy="5" fontSize="14">2</tspan><tspan dy="-5">O</tspan>
                </text>
            );
        } else if (moleculeType === 'N2') {
            return (
                <text x="0" y="10" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#00695c" opacity="0.6">
                    N<tspan dy="5" fontSize="14">2</tspan>
                </text>
            );
        } else {
            // Default CO2
            return (
                <text x="0" y="10" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#00695c" opacity="0.6">
                    CO<tspan dy="5" fontSize="14">2</tspan>
                </text>
            );
        }
    };

    return (
        <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }} {...props}>
            <defs>
                <radialGradient id="good-guy-glow-eat" cx="40%" cy="40%" r="70%" fx="30%" fy="30%">
                    <stop offset="0%" style={{ stopColor: '#dfffee', stopOpacity: 0.9 }} /> <stop offset="60%" style={{ stopColor: '#64ffda', stopOpacity: 0.95 }} />
                    <stop offset="100%" style={{ stopColor: '#1de9b6', stopOpacity: 1 }} />
                </radialGradient>

                <radialGradient id="absorbed-bubble-glow" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                    <stop offset="70%" style={{ stopColor: '#b9f6ca', stopOpacity: 0.5 }} /> <stop offset="100%" style={{ stopColor: '#69f0ae', stopOpacity: 0.6 }} /> </radialGradient>

                <filter id="biolum-glow-eat" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.4  0 1 0 0 0.9  0 0 1 0 0.7  0 0 0 1 0" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="blush-blur-eat">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
            </defs>

            <g transform="translate(250, 200)">

                <path d="M0,-130 C-70,-130 -140,-80 -150,0 C-160,90 -90,150 0,160 C90,170 160,100 150,10 C140,-90 80,-140 0,-130 Z"
                    fill="url(#good-guy-glow-eat)"
                    filter="url(#biolum-glow-eat)"
                    stroke="#00bfa5" strokeWidth="2" strokeOpacity="0.3" />

                <g transform="translate(0, 40)">
                    <circle r="50" fill="url(#absorbed-bubble-glow)" stroke="#b9f6ca" strokeWidth="2" strokeOpacity="0.5" />

                    {renderMoleculeText()}

                    <g fill="#dfffee" filter="url(#biolum-glow-eat)">
                        <circle cx="-60" cy="-20" r="5" opacity="0.8" />
                        <circle cx="-50" cy="30" r="3" opacity="0.6" />
                        <circle cx="55" cy="-10" r="4" opacity="0.8" />
                        <circle cx="45" cy="40" r="6" opacity="0.7" />
                        <circle cx="0" cy="-65" r="7" opacity="0.5" />
                    </g>
                </g>

                <g transform="translate(0, -40)">
                    <ellipse cx="-60" cy="20" rx="15" ry="10" fill="#ff80ab" opacity="0.5" filter="url(#blush-blur-eat)" />
                    <ellipse cx="60" cy="20" rx="15" ry="10" fill="#ff80ab" opacity="0.5" filter="url(#blush-blur-eat)" />

                    <g fill="#004d40">
                        <ellipse cx="-40" cy="-10" rx="10" ry="14" />
                        <ellipse cx="40" cy="-10" rx="10" ry="14" />
                    </g>
                    <g fill="#ffffff">
                        <circle cx="-36" cy="-16" r="4" />
                        <circle cx="44" cy="-16" r="4" />
                    </g>

                    <path d="M-25,25 Q0,40 25,25" fill="none" stroke="#004d40" strokeWidth="4" strokeLinecap="round" />
                </g>
            </g>
        </svg>
    );
};
