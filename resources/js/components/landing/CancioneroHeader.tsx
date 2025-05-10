import { asset, cn } from '@/lib/utils';
import { faMusic, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function CancioneroHeader() {
    const [isSticky, setSticky] = useState(false);
    window.onscroll = () => {
        setSticky(window.scrollY > 0);
    };
    return (
        <div className="sticky top-0 z-20 flex h-auto w-full justify-center transition sm:h-20">
            <div className="relative h-full w-full px-5">
                <div
                    className={cn('absolute inset-0 w-full backdrop-blur-lg', {
                        'bg-black/20': isSticky,
                        'bg-transparent': !isSticky,
                    })}
                />
                <div className="relative container mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-between gap-1 p-2 sm:flex-row">
                    <Link href={route('home')} className="flex h-16 sm:h-full">
                        <img className="h-full w-full" src={asset('img/info/logo.webp')} alt="Logo del bar karaoke bohemia" />
                    </Link>
                    <nav className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                        <Option href={route('cancionero.cola')} text="Canciones pedidas" icon={faMusic} />
                        <Option href={route('cancionero.lista')} text="Pedir canción" icon={faPlus} />
                    </nav>
                </div>
            </div>
        </div>
    );
}

function Option({ href, text, icon }) {
    // const { pathname } = useLocation();
    // const root = '/cancionero/';
    // const isActive = pathname.includes(root + to) || (to === './' && pathname === root);
    const isActive = false;
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center justify-center gap-1 py-2 text-base text-white opacity-70 transition hover:opacity-100 sm:gap-2 sm:px-1 sm:text-lg',
                {
                    'text-[--c2-bg] opacity-100': isActive,
                },
            )}
        >
            <FontAwesomeIcon className="text-sm sm:text-base" icon={icon} />
            {text}
        </Link>
    );
}
