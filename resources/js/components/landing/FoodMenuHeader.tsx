import { asset, cn } from '@/lib/utils';
import type { CategoryFoodT } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function FoodMenuHeader({
    categories,
    selectedCategory,
    onClickOption,
}: {
    categories: CategoryFoodT[];
    selectedCategory: CategoryFoodT | null;
    onClickOption: (category: CategoryFoodT | null) => void;
}) {
    const [isSticky, setSticky] = useState(false);
    window.onscroll = () => {
        setSticky(window.scrollY > 0);
    };
    return (
        <div className="sticky top-0 z-20 flex h-auto w-full justify-center transition lg:h-20">
            <div
                className="relative h-full w-full px-[--pdd]"
                style={{
                    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                }}
            >
                <div
                    className={cn('absolute inset-0 w-full', {
                        'bg-black/20 backdrop-blur-sm': isSticky,
                        'bg-transparent backdrop-blur-none': !isSticky,
                    })}
                />
                <div className="relative container mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-between gap-1 p-2 lg:flex-row">
                    <Link href="/" className="flex h-16 lg:h-full">
                        <img className="h-full w-full" src={asset('img/info/logo.webp')} alt="Logo del bar karaoke bohemia" />
                    </Link>
                    <nav className="grid grid-cols-3 items-center md:grid-cols-6">
                        <Option text="Todo" isActive={selectedCategory === null} onClick={() => onClickOption(null)} />
                        {categories &&
                            categories.map((category) => (
                                <Option
                                    key={category.id}
                                    text={category.name}
                                    isActive={selectedCategory?.id === category?.id}
                                    onClick={() => onClickOption(category)}
                                />
                            ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

function Option({ text, isActive, onClick }) {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-1 py-2 text-base text-nowrap text-white opacity-70 transition hover:opacity-100 sm:gap-2 sm:px-1 sm:text-lg',
                {
                    'text-[--c2-bg] opacity-100': isActive,
                },
            )}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
