import { Bar, Pie } from 'react-chartjs-2';
import React, { useState } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Registering components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [timeOnOpeningPageData, setTimeOnOpeningPageData] = useState([12, 19, 3, 5, 2, 3]);
  const [timeOnStatsPageData, setTimeOnStatsPageData] = useState([8, 15, 10, 7, 12, 5]);

  const appStyle = {
    backgroundColor: '#2B2A2A',
    color: 'white',
    minHeight: '100vh',
    padding: '20px',
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto',
    gap: '20px',
    
  };

  const chartContainerStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [33, 33, 34],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  };

  const barDataOpeningPage = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Time on Opening Page',
        data: timeOnOpeningPageData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
    ],
  };

  const barDataStatsPage = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Time on Stats Page',
        data: timeOnStatsPageData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
    ],
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>At Bet Analytics Dashboard</header>
      <div style={gridContainerStyle}>
        <div style={chartContainerStyle}>Status Bar Components Here</div>
        <div style={chartContainerStyle}>
          <div style={{width: "45%"}}> 
          <Pie data={pieData} />
          </div>
        </div>
        <div style={chartContainerStyle}>
          <Bar data={barDataOpeningPage} />
        </div>
        <div style={ chartContainerStyle }>
          <Bar data={barDataStatsPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
