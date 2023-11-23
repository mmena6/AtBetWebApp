import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Histogram = ({ data, binSize, xAxisLabel, yAxisLabel, yAxisMax }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const ctx = canvasRef.current.getContext('2d');

        const processData = (data, binSize) => {
            const bins = {};
            data.forEach(num => {
                const bin = Math.floor(num / binSize) * binSize;
                bins[bin] = (bins[bin] || 0) + 1;
            });
            return bins;
        };

        const processedData = processData(data, binSize);
        const labels = Object.keys(processedData);
        const values = Object.values(processedData);

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frequency',
                    data: values,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: yAxisMax,
                        title: {
                            display: !!yAxisLabel,
                            text: yAxisLabel,
                            color: '#FFFFFF',
                            font: {
                                size: "15em" 
                            }
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    },
                    x: {
                        title: {
                            display: !!xAxisLabel,
                            text: xAxisLabel,
                            color: '#FFFFFF', 
                            font: {
                                size: "15em" 
                            }
                        },
                        ticks: {
                            color: '#FFFFFF' 
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, binSize, xAxisLabel, yAxisLabel, yAxisMax]);

    return <canvas ref={canvasRef}></canvas>;
};

export default Histogram;
