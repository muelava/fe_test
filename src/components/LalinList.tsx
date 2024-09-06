import React, { useEffect, useState } from 'react';
import { CloseButton, Input, Pagination, Select, SimpleGrid, Table } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { getLalins } from '../api/lalins';


const LalinList: React.FC = () => {
    const [lalins, setLalins] = useState<any[]>([]);
    const [perPage, setPerPage]: any = useState(5);
    const [activePage, setPage]: any = useState(1);
    const [search, setSearch] = useState('');


    const fetchData = async () => {
        try {
            const res = await getLalins();
            setLalins(res.data.data.rows.rows);
        } catch (error) {
            console.error('Error fetching gerbangs:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const itemsPerPage = perPage;
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = lalins.slice(startIndex, endIndex);

    const searchData = paginatedData?.filter(item =>
        item.IdAsalGerbang === search ||
        item.IdGerbang === Number(search) ||
        item.IdCabang === Number(search) ||
        item.Golongan === Number(search)
    );

    const result = search ? searchData : paginatedData;

    const rows = result.map((itm, i) => (
        <Table.Tr key={i}>
            <Table.Td>{++i}</Table.Td>
            <Table.Td>Ruas {itm.IdCabang}</Table.Td>
            <Table.Td>Gerbang {itm.IdAsalGerbang}</Table.Td>
            <Table.Td>Gardu {itm.IdGardu}</Table.Td>
        </Table.Tr >
    ));

    return (
        <>
            <div className='flex justify-between'>
                <Input
                    placeholder="Cari Disini"
                    value={search}
                    size='sm'
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    rightSectionPointerEvents="all"
                    leftSection={<IconSearch size={16} />}
                    autoFocus
                    rightSection={
                        <CloseButton
                            onClick={() => setSearch('')}
                            style={{ display: search ? undefined : 'none' }}
                        />
                    }
                />
            </div>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>No</Table.Th>
                        <Table.Th>Ruas</Table.Th>
                        <Table.Th>Gerbang</Table.Th>
                        <Table.Th>Gardu</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <SimpleGrid cols={{ base: 1, md: 2 }} mt="lg">
                <Select
                    className='mx-auto md:ms-0 order-2 md:order-1'
                    placeholder="Pick value"
                    checkIconPosition="right"
                    data={["5", "10", "15"]}
                    defaultValue="5"
                    maw={80}
                    size='xs'
                    onChange={(_value) => setPerPage(_value)}
                    allowDeselect={false}
                />
                <Pagination
                    className='order-1 md:order-2  mx-auto md:mx-0 md:ms-auto'
                    value={activePage}
                    onChange={setPage}
                    total={Math.ceil(lalins.length / itemsPerPage)}
                />
            </SimpleGrid>

        </>
    );
};

export default LalinList;
