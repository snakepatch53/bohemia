import Button from '@/components/dashboard/Button';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import { Form, Input, InputImage, InputSelect, InputTextarea } from '@/components/dashboard/Form';
import { Table, Td, TdActions, Th } from '@/components/dashboard/Table';
import useCrud from '@/hooks/dashboard/useCrud';
import AppLayout from '@/layouts/app-layout';
import type { CategoryFoodT, FoodT } from '@/types';

export default function Foods({ foods, categories }: { foods: FoodT[]; categories: CategoryFoodT[] }) {
    const { addField, modeForm, setModeForm, handleSubmit, showModal, setDeleteMode, handleDelete } = useCrud({ resource: 'crud-foods' });

    return (
        <AppLayout title="Comida" breadcrumbs={[{ title: 'Comida', href: route('dashboard.foods') }]}>
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="container mx-auto">
                    <Table
                        isShow={!modeForm}
                        childrenHeader={<Button label="Crear nuevo" onClick={setModeForm()} />}
                        childrenTitles={
                            <>
                                <Th label="ID" />
                                <Th label="Imagen" />
                                <Th label="Nombre" />
                                <Th label="Categoría" />
                                <Th label="Acciones" />
                            </>
                        }
                        data={foods}
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
                                <Td label={item.category?.name} />
                                <TdActions className="w-0">
                                    <Button label="Edit" onClick={setModeForm(item)} />
                                    <Button label="Delete" variant="destructive" onClick={setDeleteMode(item)} />
                                </TdActions>
                            </>
                        )}
                    />
                    <Form isShow={modeForm} onSubmit={handleSubmit} className="mx-auto flex w-full flex-col">
                        <div className="flex w-full flex-col gap-5 sm:flex-row">
                            <InputImage {...addField('image', 'Imagen')} className="max-h-48" />
                            <div className="flex flex-1 flex-col gap-1">
                                <Input {...addField('name', 'Nombre')} />
                                <Input {...addField('price', 'Precio')} type="number" />
                                <InputTextarea {...addField('description', 'Descripción')} />
                                <InputSelect {...addField('category_food_id', 'Categoría')}>
                                    <option value="">Selecciona una opción</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </InputSelect>
                            </div>
                        </div>
                        <div className="col-span-2 flex gap-5">
                            <Button label="Save" />
                            <Button label="Cancel" variant="destructive" onClick={setModeForm(false)} type="button" />
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
