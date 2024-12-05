import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
        labels: ['Jantan', 'Betina'], // Labels for each section of the pie chart
        datasets: [
            {
                data: [data.Total_Jantan, data.Total_Betina], // Data for each slice of the pie
                backgroundColor: ['#00b4d8', '#FF8BA0'], // Color for each slice
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;
