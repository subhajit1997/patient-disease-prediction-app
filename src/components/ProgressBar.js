const ProgressBar = ({ strokeWidth, percentage }) => {
  const radius = 48 - strokeWidth / 2; // Increased radius slightly
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const pathDescription = `
      M 50,50
      m 0,-${radius}
      a ${radius},${radius} 0 1,1 0,${2 * radius}
      a ${radius},${radius} 0 1,1 0,-${2 * radius}
  `;

  const progressStyle = {
      stroke: '#eb6500',
      strokeLinecap: 'round',
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: offset,
  };

  return (
      <svg
          className="ProgressBar"
          viewBox="0 0 100 100"
          width={100}
          height={100}
      >
          <path
              className="ProgressBar-trail"
              d={pathDescription}
              strokeWidth={strokeWidth}
              fillOpacity={0}
              style={{
                  stroke: '#d6d6d6',
              }}
          />
          <path
              className="ProgressBar-path"
              d={pathDescription}
              strokeWidth={strokeWidth}
              fillOpacity={0}
              style={progressStyle}
          />
          <text
              className="ProgressBar-text"
              x={50}
              y={50}
              style={{
                  fill: '#007dbc',
                  fontSize: '24px',
                  dominantBaseline: 'central',
                  textAnchor: 'middle',
              }}
          >
              {`${percentage}%`}
          </text>
      </svg>
  );
};

export default ProgressBar;