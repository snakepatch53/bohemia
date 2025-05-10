import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useCrud({ resource, prefix = 'dashboard.' }: { resource: string; prefix?: string }) {
    const { data, setData, post, delete: del, reset, errors, processing } = useForm<any>({});
    const [selectedRow, setSelectedRow] = useState(null); // null -> modetable
    const [selectedForDelete, setSelectedForDelete] = useState(null); // null -> not delete mode

    const resetForm = (message = undefined, type = 'success') => {
        reset();
        setSelectedRow(null);
        if (message === undefined) return;
        if (type === 'error') toast.error(message);
        if (type === 'success') toast.success(message);
    };

    const handleSubmit = (evt) => {
        if (evt) evt?.preventDefault?.();
        if (!selectedRow)
            return post(route(prefix + resource + '.store'), {
                preserveScroll: true,
                onSuccess: () => resetForm('Created successfully'),
                onError: (errors) => console.error(errors),
            });

        post(route(prefix + resource + '.update', selectedRow.id + '?_method=patch'), {
            preserveScroll: true,
            onSuccess: () => resetForm('Updated successfully'),
            onError: (errors) => console.error(errors),
        });
    };

    const handleDelete = () => {
        if (!selectedForDelete) return;
        del(route(prefix + resource + '.destroy', selectedForDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                resetForm('Deleted successfully');
                setSelectedForDelete(null);
            },
            onError: (errors) => console.error(errors),
        });
    };

    return {
        errors,
        data,
        processing,
        modeForm: selectedRow !== null,
        showModal: !!selectedForDelete,
        setData,
        handleSubmit,
        handleDelete,
        addField: (name: string, label: string = '', formatter = (v) => v) => ({
            label: label || name,
            placeholder: label || name,
            onChange: (value: string) => setData(name, value),
            value: formatter(data[name] || ''),
            error: errors[name] || undefined,
            disabled: processing,
        }),
        setModeForm: (row?: any) => () => {
            if (!setSelectedRow) resetForm();
            else if (row) setData(row);
            setSelectedRow(row === false ? null : row);
        },
        setDeleteMode: (row: any) => () => {
            setData(row);
            setSelectedForDelete(row);
        },
    };
}
