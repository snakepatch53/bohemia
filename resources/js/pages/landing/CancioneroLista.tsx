import CancioneroHeader from '@/components/landing/CancioneroHeader';
import CancioneroLayout from '@/layouts/LandingLayout';
import { cn } from '@/lib/utils';
import type { SongT } from '@/types';
import { faChevronLeft, faChevronRight, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, router } from '@inertiajs/react';
import debounce from 'just-debounce-it';
import { useCallback, useState } from 'react';

type Props = {
    songs: {
        data: SongT[];
        current_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
};

export default function CancioneroLista({ songs }: Props) {
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const debounceSearch = useCallback(
        debounce((search) => {
            setLoading(true);
            if (!search)
                return router.visit(route('cancionero.lista'), {
                    method: 'get',
                    preserveState: true,
                    onFinish: () => setLoading(false),
                });
            router.visit(route('cancionero.lista', { search }), {
                method: 'get',
                preserveState: true,
                onFinish: () => setLoading(false),
            });
        }, 500),
        [],
    );

    const handleSearch = (e) => {
        const search = e.target.value;
        debounceSearch(search);
    };

    return (
        <CancioneroLayout title="Cancionero" variant="secondary">
            <CancioneroHeader />
            <div className="mt-10 flex flex-col gap-5 px-5">
                <section className="container mx-auto flex max-w-4xl flex-col items-center gap-3">
                    <Search onChange={(e) => handleSearch(e)} />
                </section>
                <section className="container mx-auto flex max-w-4xl flex-col items-center gap-3">
                    {songs?.data?.map((song) => (
                        <Item
                            key={song.id}
                            number={song.id}
                            href={route('cancionero.pedir', song.id)}
                            title={song.title}
                            artist={song.artist}
                            genre={song.gender}
                        />
                    ))}
                </section>

                <section className="container mx-auto flex max-w-4xl justify-center gap-2 pt-5 pb-10">
                    {songs?.prev_page_url && <Button href={songs?.prev_page_url} icon={faChevronLeft} disabled={loading} />}
                    <Button text={songs?.current_page} disabled />
                    {songs?.next_page_url && <Button href={songs?.next_page_url} icon={faChevronRight} disabled={loading} />}
                    <Link href={songs?.prev_page_url} className="text-c1">
                        anterior
                    </Link>
                    <Link href={songs?.next_page_url} className="text-c1">
                        siguiente
                    </Link>
                </section>
            </div>
        </CancioneroLayout>
    );
}

function Item({ href, number, title, artist, genre }) {
    return (
        <Link href={href} className="flex w-full items-center gap-3 rounded bg-black/10 p-2 sm:p-5">
            <div className="text-c1 flex aspect-square h-20 flex-col items-center justify-center rounded bg-black/20">
                <FontAwesomeIcon className="text-lg" icon={faMusic} />
                <span className="text-sm font-bold">#{number}</span>
            </div>
            <div className="flex flex-col">
                <h4 className="text-c2 block max-w-52 overflow-hidden text-lg font-bold text-nowrap text-ellipsis opacity-70 sm:max-w-none">
                    {title}
                </h4>
                <h3 className="block max-w-52 overflow-hidden text-nowrap text-ellipsis sm:max-w-none">
                    <b className="text-c1">Artista: </b>
                    <span className="opacity-80">{artist}</span>
                </h3>
                <p className="block max-w-52 overflow-hidden text-sm text-nowrap text-ellipsis opacity-60 sm:max-w-none">{genre}</p>
            </div>
        </Link>
    );
}

function Search({ onChange }) {
    return (
        <div className="flex w-full flex-1 flex-col items-center gap-2 sm:flex-row">
            <label className="font-bold tracking-wide">Busca una canción: </label>
            <div className="flex w-full flex-1 items-center gap-2 rounded bg-black/20 px-3 sm:w-auto">
                <input className="flex-1 bg-transparent py-3 outline-none" placeholder="Nombre, artista o genero" type="text" onChange={onChange} />
                <FontAwesomeIcon className="opacity-80" icon={faSearch} />
            </div>
        </div>
    );
}

function Button({ href = '', icon = null, text = null, disabled = false }) {
    return (
        <Link
            className={cn('flex aspect-square w-10 items-center justify-center rounded bg-black/20', {
                'cursor-not-allowed opacity-50': disabled,
            })}
            href={href}
            disabled={disabled}
        >
            {icon && <FontAwesomeIcon className="opacity-90" icon={icon} />}
            {text && <span>{text}</span>}
        </Link>
    );
}
