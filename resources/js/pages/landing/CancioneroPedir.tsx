import CancioneroHeader from '@/components/landing/CancioneroHeader';
import LandingLayout from '@/layouts/LandingLayout';
import { cn } from '@/lib/utils';
import useLandingCustomerStore from '@/stores/landing-customer-store';
import type { CustomerT, SongT } from '@/types';
import { faCheckCircle, faIdCardClip, faMicrophone, faMusic, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function CancioneroPedir({ song }: { song: SongT }) {
    const { customer, setCustomer } = useLandingCustomerStore();
    const [success, setSuccess] = useState(false);
    const { post, data, setData, errors } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cancionero.pedir.store', song.id), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccess(true);
                setCustomer({
                    dni: String(data.dni || ''),
                    name: String(data.name || ''),
                } as CustomerT);
            },
            onError: (errors) => console.error(errors),
        });
    };

    useEffect(() => {
        setData('song_id', song.id);
        if (customer) {
            setData('dni', customer.dni);
            setData('name', customer.name);
        }
    }, [customer, song, setData]);
    // verificamos si hay datos del cliente en localStorage
    // const client = JSON.parse(localStorage.getItem('client')) || {};
    return (
        <LandingLayout title="Cancionero" variant="tertiary">
            <CancioneroHeader />
            <section className="container mx-auto mt-10 flex flex-col items-center px-5 leading-4">
                <h3 className="text-c1 text-lg font-bold uppercase">Solicitar canción</h3>
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon className="text-c2 text-sm opacity-60" icon={faMusic} />
                    <span className="text-c2 opacity-70">
                        {song?.artist} - {song?.title}
                    </span>
                </div>
            </section>

            <form onSubmit={handleSubmit} className="mx-auto mt-5 flex w-full max-w-[500px] flex-col items-center gap-5">
                <Input
                    label="Cédula:"
                    placeholder="Ej: 0704870365"
                    icon={faIdCardClip}
                    value={String(data.dni || '')}
                    onChange={(v) => setData('dni', v.target.value)}
                    error={errors.dni}
                />
                <Input
                    label="Nombre:"
                    placeholder="Ej: Pedro Fernández"
                    icon={faUser}
                    value={String(data.name || '')}
                    onChange={(v) => setData('name', v.target.value)}
                    error={errors.name}
                />
                <Submit classWrap="mt-3" />
            </form>
            {success && <ModalSuccess />}
        </LandingLayout>
    );
}

function Input({
    label,
    placeholder,
    icon,
    error,
    ...props
}: {
    label: string;
    placeholder: string;
    icon: any;
    error: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex w-full flex-col items-center gap-1">
            <label className="font-bold tracking-wide">{label}</label>
            <div
                className={cn('flex w-full items-center gap-2 rounded bg-black/50 px-3', {
                    // 'border border-red-500': touched && errors,
                    // 'border border-green-500': touched && !errors,
                })}
            >
                <FontAwesomeIcon className="opacity-80" icon={icon} />
                <input className="flex-1 bg-transparent py-3 outline-none" placeholder={placeholder} {...props} />
            </div>
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}

function Submit({ classWrap = '' }) {
    return (
        <button
            className={cn(
                'bg-c1 flex w-full items-center justify-center gap-1 rounded px-5 py-3 transition-all duration-300 hover:opacity-80',
                classWrap,
            )}
            type="submit"
        >
            <span className="font-bold text-[--c1-txt]">¡A Cantar!</span>
            <FontAwesomeIcon className="text-sm" icon={faMicrophone} />
        </button>
    );
}

function ModalSuccess() {
    return (
        <>
            <div className="fixed inset-0">
                <ConfettiExplosion force={0.8} duration={3000} particleCount={300} width={1600} />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center bg-black/40"
            >
                <div className="flex flex-col gap-2 rounded-lg bg-black/50 px-10 py-16 shadow-xl backdrop-blur-sm">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-c1 mb-5 text-6xl" />
                    <h1 className="text-center text-2xl font-bold">¡Tu cancion empezara pronto!</h1>
                    <p className="text-center text-white opacity-90">Mira la lista para que sepas cuanto falta</p>
                    <Link
                        href={route('cancionero.cola')}
                        className="bg-c1 mt-3 flex items-center justify-center gap-1 rounded py-2 transition hover:opacity-80"
                    >
                        <span>Ver cuanto falta</span>
                        <FontAwesomeIcon icon={faMusic} className="text-sm" />
                    </Link>
                </div>
            </motion.div>
        </>
    );
}
