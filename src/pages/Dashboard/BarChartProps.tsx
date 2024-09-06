import { BarChart } from '@mantine/charts';

const BarChartProps = (props: any) => {
    return (
        <BarChart
            h={400}
            data={props?.data}
            dataKey={props?.dataKey}
            series={[{ name: props?.seriesName, color: 'blue' }]}
            yAxisLabel={props?.yAxisLabel}
        />
    )
}


export default BarChartProps
