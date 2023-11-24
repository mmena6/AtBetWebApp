
import React from 'react';
import GradientBar from './GradientBar';

const ToolTipUsageWidget = ({ranking, toolTipName, usageNumber, totalUsage, uses}) => {
  return (
    <div style={{backgroundColor: "#222222", padding: "5px", paddingBottom: "8px",}}>
        <div style={{marginLeft: "15px"}}>
        <p>{ranking}: {toolTipName}, {uses} uses.</p>
      <GradientBar backgroundColor={"#2B2A2A"} value={usageNumber}></GradientBar>
        </div>
    </div>
  );
};

export default ToolTipUsageWidget;
