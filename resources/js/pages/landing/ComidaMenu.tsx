import FoodMenuHeader from '@/components/landing/FoodMenuHeader';
import LandingLayout from '@/layouts/LandingLayout';
import { asset } from '@/lib/utils';
import type { CategoryFoodT } from '@/types';
import { useState } from 'react';

export default function ComidaMenu({ categories }: { categories: CategoryFoodT[] }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <LandingLayout title="Food Menu" variant="tertiary">
            <FoodMenuHeader categories={categories} selectedCategory={selectedCategory} onClickOption={setSelectedCategory} />
            <div className="relative px-5 py-5">
                <div className="fixed inset-0 -z-10 opacity-30" style={{ backgroundImage: `url(${asset('img/info/background.webp')})` }} />
                <div className="relative z-10 container mx-auto max-w-4xl">
                    <div className="grid gap-5 md:grid-cols-2">
                        {(selectedCategory?.foods || categories.reduce((acc, category) => acc.concat(category.foods), [])).map((food) => {
                            return food.description == null ? (
                                <Item key={food.id} title={food.name} price={food.price} src={food.image_url} />
                            ) : (
                                <ItemDesc key={food.id} title={food.name} description={food.description} price={food.price} src={food.image_url} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}

function ItemDesc({ title, description, price, src }) {
    return (
        <div className="flex items-center justify-center gap-3 rounded-md bg-black/30 p-3 shadow-lg backdrop-blur-[2px]">
            <div className="flex min-w-[25%] flex-col">
                <img className="aspect-square w-full rounded-md bg-black/20 object-cover" src={src} alt={title} />
                <p className="mt-3 text-center text-lg font-bold text-[#248f41]">${price}</p>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="font-title2 text-center text-2xl text-[--c2]">{title}</h2>
                <p className="font-title2 mx-auto text-lg text-balance opacity-75">{description}</p>
            </div>
        </div>
    );
}

function Item({ title, price, src }) {
    return (
        <div className="flex items-center gap-3 rounded-md bg-black/30 p-3 shadow-lg backdrop-blur-[2px]">
            <div className="flex max-w-[25%] min-w-[25%] flex-col">
                <img className="aspect-square w-full rounded-md bg-black/20 object-cover" src={src} alt={title} />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="font-title2 text-center text-2xl text-[--c2]">{title}</h2>
                <p className="text-lg font-bold text-[#248f41]">${price}</p>
            </div>
        </div>
    );
}
