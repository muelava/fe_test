import { useEffect, useState } from 'react';
import { DateInput } from '@mantine/dates';
import { Button, Container, SimpleGrid, Title } from '@mantine/core';
import { getLalins } from '../../api/lalins';
import BarChartProps from './BarChartProps';
import PieChartProps from './PieChartProps';

export default function Dashboard() {
    const [tanggal, setTanggal] = useState<Date | null>(null);
    const [lalins, setLalins] = useState<any | null>(null);
    const [barChart, setBarChart] = useState<any | null>(null);
    const [barChartGerbang, setBarChartGerbang] = useState<any | null>(null);

    const handleFilter = async () => {
        try {
            const res = await getLalins(tanggal);
            setLalins(res.data.data.rows.rows);
        } catch (error) {
            console.error('Error fetching gerbangs:', error);
        }
    };

    useEffect(() => {
        handleFilter();
    }, [tanggal]);

    useEffect(() => {

        if (lalins) {
            const totalsAcc = lalins.reduce((acc: any, curr: any) => {
                acc['eBca'] = (acc['eBca'] || 0) + curr.eBca;
                acc['eBri'] = (acc['eBri'] || 0) + curr.eBri;
                acc['eBni'] = (acc['eBni'] || 0) + curr.eBni;
                acc['eDKI'] = (acc['eDKI'] || 0) + curr.eDKI;
                acc['eMandiri'] = (acc['eMandiri'] || 0) + curr.eMandiri;
                acc['eMega'] = (acc['eMega'] || 0) + curr.eMega;
                acc['eFlo'] = (acc['eFlo'] || 0) + curr.eFlo;
                return acc;
            }, {});

            const chartDataAcc = [
                { label: 'BCA', jumlah: totalsAcc.eBca ? totalsAcc.eBca : 0 },
                { label: 'BRI', jumlah: totalsAcc.eBri ? totalsAcc.eBri : 0 },
                { label: 'BNI', jumlah: totalsAcc.eBni ? totalsAcc.eBni : 0 },
                { label: 'DKI', jumlah: totalsAcc.eDKI ? totalsAcc.eDKI : 0 },
                { label: 'Mandiri', jumlah: totalsAcc.eMandiri ? totalsAcc.eMandiri : 0 },
                { label: 'Mega', jumlah: totalsAcc.eMega ? totalsAcc.eMega : 0 },
                { label: 'Flo', jumlah: totalsAcc.eFlo ? totalsAcc.eFlo : 0 },
            ];

            setBarChart(chartDataAcc)


            const aggregateData = (data: any[]) => {
                const totalGerbang = 5;

                const aggregated = data?.reduce((acc: any, curr: any) => {
                    const gate = curr.IdGerbang;
                    const total = curr.eMandiri + curr.eBri + curr.eBni + curr.eBca + curr.eNobu + curr.eDKI + curr.eMega + curr.eFlo;

                    acc[gate] = { IdGerbang: "Gerbang " + gate, total };

                    return acc;
                }, {});

                for (let i = 1; i <= totalGerbang; i++) {
                    if (!aggregated[i]) {
                        aggregated[i] = { IdGerbang: "Gerbang " + i, total: 0 };
                    }
                }

                return Object.values(aggregated);
            };

            setBarChartGerbang(aggregateData(lalins));

        }
    }, [lalins])


    return (
        <Container>
            <Title order={4} mb="md">Dashboard</Title>
            <SimpleGrid cols={2} className='max-w-sm flex' spacing="lg" mb={50}>
                <DateInput flex={1}
                    value={tanggal}
                    onChange={setTanggal}
                    placeholder="Pilih Tanggal"
                    clearable
                />
                <Button onClick={handleFilter} flex={0} mx={1} maw={100}>
                    Filter
                </Button>
            </SimpleGrid>

            {/* section 1 Chart */}

            <SimpleGrid cols={{ base: 1, md: 2, }} className='mb-20'>
                {barChart && (
                    <BarChartProps data={barChart} yAxisLabel="Jumlah Lalin" dataKey="label" seriesName="jumlah" />
                )}
                {lalins && (
                    <PieChartProps data={lalins} title="Total Lalin" />
                )}
            </SimpleGrid>

            {/* section 2 Chart */}

            <SimpleGrid cols={{ base: 1, md: 2, }}>
                {barChartGerbang && (
                    <BarChartProps data={barChartGerbang} yAxisLabel="Jumlah Lalin" dataKey="IdGerbang" seriesName="total" />
                )}
                {lalins && (
                    <PieChartProps data={lalins} title="Total Lalin" />
                )}
            </SimpleGrid>
        </Container>
    );
}