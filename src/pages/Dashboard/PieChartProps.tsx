import { SimpleGrid } from '@mantine/core';
import ReactApexChart from 'react-apexcharts';

const PieChartProps = (props: any) => {
    const { data, title } = props;

    const shiftTotals = data?.reduce((acc: any, item: any) => {
        const shift = item.Shift;
        if (!acc[shift]) {
            acc[shift] = 0;
        }
        acc[shift] += item.eMandiri + item.eBri + item.eBni + item.eBca + item.eNobu + item.eDKI + item.eMega + item.eFlo;
        return acc;
    }, {});


    const series = [shiftTotals[1] || 0, shiftTotals[2] || 0, shiftTotals[3] || 0];
    const labels = ['Shift 1', 'Shift 2', 'Shift 3'];
    const colors = ['#228AE5', '#FF9800', '#008FFB'];

    const state = {
        series: series,
        options: {
            title: {
                text: title,
                align: 'center'
            },
            labels: labels,
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%'
                    }
                }
            },
            colors: colors,
            legend: {
                // show: false,
                position: "bottom",
                formatter: function (val: any, opts: any) {
                    const totalValue = opts.w.config.series.reduce((a: any, b: any) => a + b, 0);
                    const percentage: any = ((opts.w.config.series[opts.seriesIndex] / totalValue) * 100).toFixed(1);
                    return `${val}: <b>${isNaN(percentage) ? 0 : percentage}</b>%`;
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: "100%"
                        },
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            ]
        }
    };


    return (
        <>
            <SimpleGrid>
                <ReactApexChart options={state.options} series={state.series} type="donut" />
            </SimpleGrid>
        </>
    );
}

export default PieChartProps;
