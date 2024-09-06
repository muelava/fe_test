import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text, SimpleGrid, Input } from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { createGerbang, editGerbang } from '../api/gerbang';

const ModalButtonAdd = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [namaCabang, setNamaCabang]: any = useState("");
    const [namaGerbang, setNamaGerbang]: any = useState("");

    const id: number = Math.floor(Math.random() * 100);
    const IdCabang: number = 16;


    const handleAddClose = async () => {
        await createGerbang({ id: id, IdCabang: IdCabang, NamaCabang: namaCabang, NamaGerbang: namaGerbang })
        await props.handleAdd()
        close()
    }


    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} size={'md'} title="Tambah Gerbang" centered>
                <SimpleGrid cols={2} mb={'lg'}>
                    <Input.Wrapper label="Ruas">
                        <Input placeholder="Ruas" onInput={(event) => setNamaCabang(event.currentTarget.value)} />
                    </Input.Wrapper>
                    <Input.Wrapper label="Gerbang">
                        <Input placeholder="Gerbang" onInput={(event) => setNamaGerbang(event.currentTarget.value)} />
                    </Input.Wrapper>
                </SimpleGrid>
                <Group>
                    <Button variant='light' size='xs' color='gray' onClick={close} className='ms-auto'>Batal</Button>
                    <Button size='xs' color='blue' onClick={handleAddClose}>Simpan</Button>
                </Group>
            </Modal>
            <Button size='sm' onClick={open} leftSection={<IconPlus size={14} className='ms-auto' />}>Tambah</Button>
        </>
    );
}

const ModalButtonEdit = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [namaCabangBaru, setNamaCabangBaru]: any = useState("");
    const [namaGerbangBaru, setNamaGerbangBaru]: any = useState("");


    const handleEditClose = async () => {
        await editGerbang({ id: props.items.id, IdCabang: props.items.IdCabang, NamaCabang: namaCabangBaru ? namaCabangBaru : props.items.NamaCabang, NamaGerbang: namaGerbangBaru ? namaGerbangBaru : props.items.NamaGerbang })
        await props.handleEdit()
        close()
    }


    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} size={'md'} title="Edit Gerbang" centered>
                <SimpleGrid cols={2} mb={'lg'}>
                    <Input.Wrapper label="Ruas">
                        <Input placeholder="Ruas" defaultValue={props.items.NamaCabang} onInput={(event) => setNamaCabangBaru(event.currentTarget.value)} />
                    </Input.Wrapper>
                    <Input.Wrapper label="Gerbang">
                        <Input placeholder="Gerbang" defaultValue={props.items.NamaGerbang} onInput={(event) => setNamaGerbangBaru(event.currentTarget.value)} />
                    </Input.Wrapper>
                </SimpleGrid>
                <Group>
                    <Button variant='light' size='xs' color='gray' onClick={close} className='ms-auto'>Batal</Button>
                    <Button size='xs' color='blue' onClick={handleEditClose}>Simpan Perubahan</Button>
                </Group>
            </Modal>
            <Button variant='light' size='compact-xs' onClick={open}><IconEdit size={14} /></Button>
        </>
    );
}

const ModalButtonView = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);

    interface DataView {
        id: number;
        IdCabang: number;
        NamaCabang: string;
        NamaGerbang: string;
    }

    const [view, setView]: any = useState<DataView[]>([]);
    const handleView = (data: Array<DataView>) => {
        setView(data)
        open()
    }

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} size={'md'} title="Data Gerbang" centered>
                <SimpleGrid cols={2}>
                    <div>
                        <Text size='xs' color='gray' >Nama Cabang</Text>
                        <Text size='sm' fw={'bold'} color='dark' mb={'lg'}>{view.NamaCabang}</Text>
                    </div>
                    <div>
                        <Text size='xs' color='gray' >Nama Gerbang</Text>
                        <Text size='sm' fw={'bold'} color='dark' mb={'lg'}>{view.NamaGerbang}</Text>
                    </div>
                </SimpleGrid>
                <Group>
                    <Button variant='light' size='xs' color='gray' onClick={close} className='ms-auto'>Tutup</Button>
                </Group>
            </Modal>
            <Button variant='light' size='compact-xs' onClick={() => handleView(props.dataView)}><IconEye size={14} /></Button>
        </>
    );
}

const ModalButtonDelete = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);

    const handleDeleteAndClose = async () => {
        await props.handleDelete();
        close();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} size={'sm'} title="Mohon Konfirmasi!" centered>
                <Text size='sm' mb={'lg'}>Apakah anda yakin ingin menghapus Ruas {props?.itemName} ?</Text>
                <Group>
                    <Button variant='light' size='xs' color='gray' onClick={close} className='ms-auto'>Batal</Button>
                    <Button size='xs' color='red' onClick={handleDeleteAndClose}>Hapus</Button>
                </Group>
            </Modal>
            <Button variant='light' size='compact-xs' color='red' onClick={open}><IconTrash size={14} /></Button>
        </>
    );
}

export { ModalButtonAdd, ModalButtonView, ModalButtonDelete, ModalButtonEdit }