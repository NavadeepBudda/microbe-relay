import React from 'react';

export const GoodGuy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }} {...props}>
    <defs>
      <radialGradient id="good-guy-glow" cx="40%" cy="40%" r="70%" fx="30%" fy="30%">
        <stop offset="0%" style={{ stopColor: '#dfffee', stopOpacity: 1 }} /> 
        <stop offset="60%" style={{ stopColor: '#64ffda', stopOpacity: 1 }} /> 
        <stop offset="100%" style={{ stopColor: '#1de9b6', stopOpacity: 1 }} /> 
      </radialGradient>

      <radialGradient id="internal-bubble-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#64ffda', stopOpacity: 0.1 }} />
      </radialGradient>

      <filter id="biolum-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.4  0 1 0 0 0.9  0 0 1 0 0.7  0 0 0 1 0" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="blush-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
      </filter>
    </defs>

    <g transform="translate(200, 200)">
      
      <path d="M0,-120 C-60,-120 -130,-70 -140,10 C-150,90 -80,140 0,150 C80,160 150,100 140,0 C130,-100 70,-130 0,-120 Z" 
            fill="url(#good-guy-glow)" 
            filter="url(#biolum-glow)"
            stroke="#00bfa5" strokeWidth="2" strokeOpacity="0.3" />

      <circle cx="-70" cy="-40" r="20" fill="url(#internal-bubble-glow)" />
      <circle cx="80" cy="60" r="15" fill="url(#internal-bubble-glow)" />
      <ellipse cx="60" cy="-70" rx="25" ry="15" fill="url(#internal-bubble-glow)" transform="rotate(-20)"/>

      <g transform="translate(0, 10)">
          <ellipse cx="-60" cy="20" rx="15" ry="10" fill="#ff80ab" opacity="0.5" filter="url(#blush-blur)" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="#ff80ab" opacity="0.5" filter="url(#blush-blur)" />

          <g fill="#004d40">
              <ellipse cx="-40" cy="-10" rx="10" ry="14" />
              <ellipse cx="40" cy="-10" rx="10" ry="14" />
          </g>
          <g fill="#ffffff">
               <circle cx="-36" cy="-16" r="4" />
               <circle cx="44" cy="-16" r="4" />
          </g>

          <path d="M-20,25 Q0,35 20,25" fill="none" stroke="#004d40" strokeWidth="4" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);
