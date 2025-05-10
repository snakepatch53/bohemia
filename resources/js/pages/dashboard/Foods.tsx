import Button from '@/components/dashboard/Button';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import { Form, Input, InputImage, InputTextarea } from '@/components/dashboard/Form';
import { Table, Td, TdActions, Th } from '@/components/dashboard/Table';
import useCrud from '@/hooks/dashboard/useCrud';
import AppLayout from '@/layouts/app-layout';
import type { ServiceT } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CircleHelp, Images, Pen, Sheet, Trash } from 'lucide-react';

export default function Services() {
    const { services } = usePage().props as unknown as { services: ServiceT[] };

    const { addField, modeForm, setModeForm, handleSubmit, showModal, setDeleteMode, handleDelete } = useCrud({ resource: 'crud-services' });
    // console.log(data);

    return (
        <AppLayout title="Services" breadcrumbs={[{ title: 'Services', href: route('dashboard.services') }]}>
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="container mx-auto">
                    <Table
                        isShow={!modeForm}
                        childrenHeader={<Button label="Create new" onClick={setModeForm()} />}
                        childrenTitles={
                            <>
                                <Th label="ID" />
                                <Th label="Image" />
                                <Th label="Name" />
                                <Th label="Actions" />
                            </>
                        }
                        data={services}
                        onRow={(item) => (
                            <>
                                <Td label={String(item.id)} className="w-0" />
                                <Td className="w-32">
                                    <img
                                        className="aspect-video w-full rounded object-cover transition-transform duration-200 hover:scale-200"
                                        src={item.image_url}
                                        alt={'Image of service ' + item.name}
                                    />
                                </Td>
                                <Td label={item.name} />
                                <TdActions className="w-0">
                                    <Button icon={CircleHelp} as={Link} href={route('dashboard.service_faqs', item.id)} />
                                    <Button icon={Images} as={Link} href={route('dashboard.service_images', item.id)} />
                                    <Button icon={Sheet} as={Link} href={route('dashboard.service', item.id)} />
                                    <Button variant="secondary" icon={Pen} onClick={setModeForm(item)} />
                                    <Button variant="destructive" icon={Trash} onClick={setDeleteMode(item)} />
                                </TdActions>
                            </>
                        )}
                    />
                    <Form isShow={modeForm} onSubmit={handleSubmit} className="mx-auto flex w-full flex-col">
                        <div className="flex w-full flex-col gap-5 sm:flex-row">
                            <InputImage {...addField('image', 'Image')} className="max-h-48" />
                            <div className="flex flex-1 flex-col gap-1">
                                <Input {...addField('name', 'Name')} />
                                <InputTextarea {...addField('description', 'Description')} />
                            </div>
                        </div>
                        <div className="col-span-2 flex gap-5">
                            <Button label="Save" />
                            <Button label="Cancel" variant="destructive" onClick={setModeForm(false)} />
                        </div>
                    </Form>
                    <ConfirmModal
                        title="Delete row"
                        subtitle="Are you sure you want to delete this row? This action cannot be undone."
                        onConfirm={handleDelete}
                        onCancel={setDeleteMode(false)}
                        isShow={showModal}
                    />
                </div>
            </section>
        </AppLayout>
    );
}
