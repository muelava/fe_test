import React, { useEffect, useState } from 'react';
import { deleteGerbang, getGerbangs } from '../api/gerbang';
import { CloseButton, Group, Input, Pagination, Select, SimpleGrid, Table } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ModalButtonAdd, ModalButtonDelete, ModalButtonEdit, ModalButtonView } from './Modals';


interface Gerbang {
    id: number;
    IdCabang: number;
    NamaGerbang: string;
    NamaCabang: string;
}

const GerbangList: React.FC = () => {
    const [gerbangs, setGerbangs] = useState<Gerbang[]>([]);
    const [perPage, setPerPage]: any = useState(5);
    const [activePage, setPage]: any = useState(1);
    const [search, setSearch] = useState('');


    const fetchData = async () => {
        try {
            const res = await getGerbangs();
            setGerbangs(res.data.data.rows.rows);
        } catch (error) {
            console.error('Error fetching gerbangs:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number, IdCabang: number) => {
        await deleteGerbang({ id: id, IdCabang: IdCabang })
        fetchData()
    }

    const handleEdit = async () => {
        fetchData()
    }

    const handleAdd = async () => {
        fetchData()
    }


    const itemsPerPage = perPage;
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = gerbangs.slice(startIndex, endIndex);

    const searchData = paginatedData?.filter(item =>
        item.NamaGerbang.toLowerCase().includes(search.toLowerCase()) ||
        item.NamaCabang.toLowerCase().includes(search.toLowerCase())
    );

    const rows = searchData?.map((itm, i) => (
        <Table.Tr key={i}>
            <Table.Td>{++i}</Table.Td>
            <Table.Td>{itm.NamaCabang}</Table.Td>
            <Table.Td>{itm.NamaGerbang}</Table.Td>
            <Table.Td>
                <Group wrap={'nowrap'}>
                    <ModalButtonEdit handleEdit={() => handleEdit()} items={itm} />
                    <ModalButtonView dataView={itm} />
                    <ModalButtonDelete handleDelete={() => handleDelete(itm.id, itm.IdCabang)} itemName={itm.NamaCabang} />
                </Group>
            </Table.Td>
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
                <ModalButtonAdd handleAdd={() => handleAdd()} />
            </div>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>No</Table.Th>
                        <Table.Th>Ruas</Table.Th>
                        <Table.Th>Gerbang</Table.Th>
                        <Table.Th>Aksi</Table.Th>
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
                    total={Math.ceil(gerbangs.length / itemsPerPage)}
                />
            </SimpleGrid>

        </>
    );
};

export default GerbangList;
