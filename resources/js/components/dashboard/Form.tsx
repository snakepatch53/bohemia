import { cn } from '@/lib/utils';
import { Check, ImagePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Form({ isShow = true, onSubmit = null, className = '', children, ...props }) {
    if (!isShow) return null;
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
            className={cn('grid gap-5 md:grid-cols-2', className)}
            {...props}
        >
            {children}
        </form>
    );
}

export function Input({ label, error, placeholder, onChange, className = '', classInput = '', ...props }) {
    return (
        <Layout label={label} error={error} className={className}>
            <input
                placeholder={placeholder}
                className={cn('flex flex-1 rounded-md border px-3', classInput)}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </Layout>
    );
}

export function InputCheck({ label, error, onChange, className = '', classInput = '', ...props }) {
    const value = props?.value || false;
    const onChangeValue = () => onChange(!value);

    return (
        <Layout label={label} error={error} className={cn('py-4', className)}>
            <button
                type="button"
                className={cn('relative mr-auto aspect-square flex-1 cursor-pointer rounded border', classInput)}
                onClick={onChangeValue}
            >
                <Check size={30} className={cn('absolute -right-2 -bottom-1 hidden text-green-500 dark:text-green-700', { block: value })} />
            </button>
        </Layout>
    );
}

export function InputSelect({ label, error, onChange, className = '', classInput = '', children, ...props }) {
    return (
        <Layout label={label} error={error} className={className}>
            <select className={cn('flex-1 rounded-md border px-3 dark:bg-black', classInput)} onChange={(e) => onChange(e.target.value)} {...props}>
                {children}
            </select>
        </Layout>
    );
}

export function InputTextarea({ label, placeholder, error, onChange, className = '', ...props }) {
    return (
        <Layout label={label} error={error} className={cn(className, 'h-auto')}>
            <textarea
                placeholder={placeholder}
                className={cn('field-sizing-content resize-none rounded-md border px-3 py-6')}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </Layout>
    );
}

export function InputImage({
    label,
    error,
    accept = 'image/*',
    value = '',
    onChange = null,
    disabled = false,
    currentImageUrl = undefined,
    className = '',
    classImage = '',
    classIcon = '',
    ...props
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragCounter = useRef(0);
    const dragTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const processSelectedFile = (file: File | null) => {
        onChange?.(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        processSelectedFile(file);
    };

    const handleDrag = (e: React.DragEvent<HTMLLabelElement>, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEntering) {
            dragCounter.current += 1;
            if (dragTimeoutRef.current) {
                clearTimeout(dragTimeoutRef.current);
                dragTimeoutRef.current = null;
            }
            setIsDragging(true);
        } else {
            dragCounter.current -= 1;
            if (dragCounter.current === 0) {
                dragTimeoutRef.current = setTimeout(() => {
                    setIsDragging(false);
                }, 50);
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current = 0;
        setIsDragging(false);
        if (dragTimeoutRef.current) {
            clearTimeout(dragTimeoutRef.current);
            dragTimeoutRef.current = null;
        }
        const file = e.dataTransfer.files[0];
        if (file && (accept === '*' || file.type.startsWith(accept.replace('/*', '')))) {
            processSelectedFile(file);
        }
    };

    useEffect(() => {
        return () => {
            if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (typeof value === 'string') {
            onChange(null);
        }
    }, [value]); // eslint-disable-line

    return (
        <Layout
            label={label}
            error={error}
            className={cn(
                'flex h-auto w-full max-w-56 flex-col',
                {
                    'pointer-events-none opacity-50': disabled,
                },
                className,
            )}
        >
            <label
                className={cn(
                    'group relative mt-1 block aspect-square h-full w-full cursor-pointer overflow-hidden rounded-xl bg-black/10 dark:bg-white/10',
                    {
                        'ring-primary border-primary border-2 border-dashed ring-4': isDragging,
                    },
                    classImage,
                )}
                onDragOver={(e) => handleDrag(e, true)}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDrop={handleDrop}
            >
                {preview && <img src={preview} alt="Preview" className={cn('h-full w-full object-contain')} />}
                {!preview && currentImageUrl && <img src={currentImageUrl} alt="Current image" className={cn('h-full w-full object-contain')} />}
                {!preview && !currentImageUrl && (
                    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <ImagePlus className={cn('h-full w-full max-w-20 text-neutral-400', classIcon)} />
                    </div>
                )}
                <div
                    className={cn('absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-sm transition-opacity', {
                        'bg-black/30 opacity-100 dark:bg-white/20': isDragging,
                        'bg-black/10 opacity-0 group-hover:opacity-100 dark:bg-white/10': !isDragging,
                    })}
                >
                    <ImagePlus
                        className={cn(
                            {
                                'text-white dark:text-black': isDragging,
                                'text-black': !isDragging,
                            },
                            classIcon,
                        )}
                        size={60}
                    />
                    {isDragging && <p className="text-lg font-medium text-white dark:text-black">Soltar archivo aquí</p>}
                </div>
                <input
                    id={`file-${label}`}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={accept}
                    disabled={disabled}
                    {...props}
                />
            </label>
        </Layout>
    );
}

function Layout({ className, label, error, children }) {
    return (
        <label className={cn('flex h-24 flex-col', className)}>
            <span className="pl-1 text-sm font-bold">{label}</span>
            {children}
            <span className="mt-0.5 h-6 truncate text-sm text-red-500">{error || ''}</span>
        </label>
    );
}
