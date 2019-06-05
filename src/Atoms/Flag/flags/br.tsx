import React from 'react';

export default function FlagBr() {
  return (
    <>
      <g fill="none" fillRule="evenodd">
        <rect width="641" height="480" fill="#05AB41" fillRule="nonzero" />
        <path
          fill="#FDD216"
          fillRule="nonzero"
          d="M74.2485531,249.009973 C67.3425358,244.310045 67.1590303,236.814841 74.2485531,231.990026 L308.495549,72.5719323 C315.401567,67.8720034 326.414928,67.7471177 333.504451,72.5719323 L567.751446,231.990026 C574.657466,236.689955 574.840969,244.185159 567.751446,249.009973 L333.504451,408.428069 C326.598434,413.127998 315.585073,413.25288 308.495549,408.428069 L74.2485531,249.009973 Z"
        />
        <g transform="translate(215 130)">
          <ellipse
            cx="106.5"
            cy="112.119"
            fill="#053087"
            fillRule="nonzero"
            rx="106.5"
            ry="112.119"
          />
          <mask id="br-b" fill="#fff">
            <ellipse id="br-a" cx="106.5" cy="112.119" rx="106.5" ry="112.119" />
          </mask>
          <path
            stroke="#FFF"
            strokeLinecap="square"
            strokeWidth=".773"
            d="M-15.3960014,95.4467409 C-0.256387171,79.5220041 54.817559,87.3118667 106.388445,96.1142737 C157.959331,104.916681 213.303202,128.910775 228.423216,144.806343"
            mask="url(#br-b)"
            transform="rotate(6 106.514 115.528)"
          />
        </g>
      </g>
      <title>Brazilia</title>
    </>
  );
}
