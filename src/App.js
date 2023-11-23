import { Pie } from 'react-chartjs-2';
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
import Histogram from './Components/Histogram';
import ToolTipUsageWidget from './Components/ToolTipUsageWidget';

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
  const [topToolTipData, getTopToolTipData] = useState([{"toolTipName": "Tooltip 1", "usageNumber": 100, "totalUsage": 100, "ranking": 1, "uses": 25}, {"toolTipName": "Tooltip 2", "usageNumber": 80, "totalUsage": 400, "ranking": 1, "uses": 15}, {"toolTipName": "Tooltip 3", "usageNumber": 60, "totalUsage": 400, "ranking": 1, "uses": 10}]);  
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
    display: 'flex', 
    flexDirection: "column",
    justifyContent: 'left', 
    alignItems: 'center', 
    minHeight: '300px',
    maxHeight: "40vh"
  };

  const barContainerStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'left', 
    alignItems: 'left', 
    minHeight: '300px', 
    maxHeight: "40vh"
  };

  const pieChartStyle = {
    objectFit: "fill",
    height: 'auto' 
  };

  const pieData = {
    labels: ['Casual Emotional', 'Casual Analytical', 'Advanced'],
    datasets: [
      {
        data: [5, 7, 9],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>At Bet Analytics Dashboard</header>
      <div style={gridContainerStyle}>
        <div style={barContainerStyle}>
          <div style={{backgroundColor: "#5E5D5D", borderRadius: "8px", padding: "10px", marginBottom: "10px"}}>
          
          <h2 style={{marginLeft: "40%"}}>Top 3 Tools</h2>
          <ToolTipUsageWidget totalUsage={topToolTipData[0].toolTipName} usageNumber={topToolTipData[0].usageNumber} ranking={1} toolTipName={topToolTipData[0].toolTipName} uses={topToolTipData[0].uses} />
          <ToolTipUsageWidget totalUsage={topToolTipData[1].toolTipName} usageNumber={topToolTipData[1].usageNumber} ranking={2} toolTipName={topToolTipData[1].toolTipName}  uses={topToolTipData[1].uses}/>
          <ToolTipUsageWidget totalUsage={topToolTipData[2].toolTipName} usageNumber={topToolTipData[2].usageNumber} ranking={3} toolTipName={topToolTipData[2].toolTipName}  uses={topToolTipData[2].uses}/>
          </div>
          </div>
        <div style={chartContainerStyle}>
          <div style={pieChartStyle}> 
          <Pie data={pieData} />
          </div>
          <p>User Segments</p>
        </div>
        <div style={chartContainerStyle}>
          <Histogram data={timeOnOpeningPageData}  binSize={1} xAxisLabel={"Distribution of time on Team Select Page"} yAxisLabel={"Number of occurrences"}/>
        </div>
        <div style={ chartContainerStyle }>
        <Histogram data={timeOnStatsPageData}  binSize={5} xAxisLabel={"Distribution of time on Stats Page"} yAxisLabel={"Number of occurrences"} />        </div>
      </div>
    </div>
  );
}

export default App;
