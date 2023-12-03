import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
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
import MetricsAPI from './metricsApi';

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
  const metricsAPI = new MetricsAPI();

  const [timeOnOpeningPageData, setTimeOnOpeningPageData] = useState([12, 19, 3, 5, 2, 3]);
  const [timeOnStatsPageData, setTimeOnStatsPageData] = useState([8, 15, 10, 7, 12, 5]);
  const [topToolTipData, setTopToolTipData] = useState([{"toolTipName": "W-L%", "usageNumber": 100, "totalUsage": 100, "ranking": 1, "uses": 25}, {"toolTipName": "WHIP", "usageNumber": 80, "totalUsage": 400, "ranking": 1, "uses": 15}, {"toolTipName": "ERA", "usageNumber": 60, "totalUsage": 400, "ranking": 1, "uses": 10}]);  

  const getMetrics = async() => {
    try {
      const metrics = await metricsAPI.getMetrics();
      setTimeOnOpeningPageData(metrics['timers']['opening']);
      setTimeOnStatsPageData(metrics['timers']['stats']);

      let totalUses = 0;
      let toolTipData = [];
      metrics['features']['tooltip'].forEach((item) => totalUses += item[1]);
      metrics['features']['tooltip'].forEach((item, index) => {
        toolTipData.push({
          'ranking': index,
          'toolTipName': item[0],
          'uses': item[1],
          'usageNumber': Math.round((item[1] / totalUses) * 100),
          'totalUsage': null,
        })
      });
      setTopToolTipData(toolTipData);
    } catch(e) {
      console.error("error occurred while calling getTeams: " + e.message, e, e.stack);
    }
  };
  useEffect(() => {
    getMetrics();
  }, []);

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
        data: [5, 8, 4],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>At Bet Analytics Dashboard</header>
      <div style={gridContainerStyle}>
        <div style={barContainerStyle}>
          <div style={{backgroundColor: "#5E5D5D", borderRadius: "8px", padding: "10px", marginBottom: "10px", maxHeight: "95%"}}>
          <h2 style={{marginLeft: "40%", marginBottom: "-1vh"}}>Top 3 Tools</h2>
          <ToolTipUsageWidget totalUsage={topToolTipData[0].toolTipName} usageNumber={topToolTipData[0].usageNumber} ranking={1} toolTipName={topToolTipData[0].toolTipName} uses={topToolTipData[0].uses} />
          <ToolTipUsageWidget totalUsage={topToolTipData[1].toolTipName} usageNumber={topToolTipData[1].usageNumber} ranking={2} toolTipName={topToolTipData[1].toolTipName} uses={topToolTipData[1].uses} />
          <ToolTipUsageWidget totalUsage={topToolTipData[2].toolTipName} usageNumber={topToolTipData[2].usageNumber} ranking={3} toolTipName={topToolTipData[2].toolTipName} uses={topToolTipData[2].uses} />
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
