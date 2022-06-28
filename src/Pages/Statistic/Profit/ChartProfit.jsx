import React, { memo } from 'react'
import { Bar } from 'react-chartjs-2'

function ChartProfit({data,options}) {
    return (
        <div>
            <Bar data={data} options={options} style={{ padding: 50 }} />
        </div>
    )
}

export default memo(ChartProfit)
