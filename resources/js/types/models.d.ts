export type CustomerT = {
    id: number;
    name: string;
    dni: string;
    created_at: string;
    updated_at: string;
};

export type SongT = {
    id: number;
    title: string;
    artist: string;
    gender: string;
    created_at: string;
    updated_at: string;
};

export type SongRequestT = {
    id: number;
    customer_id: number;
    customer: CustomerT;
    song_id: number;
    song: SongT;
    created_at: string;
    updated_at: string;
    date_str: string;
    date_diff: string;
};

export type SongT = {
    id: number;
    title: string;
    artist: string;
    gender: string;
};

export type CategoryFoodT = {
    id: number;
    name: string;
    description: string;
    image: string;
    foods: FoodT[];
};

export type FoodT = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    image_url: string;
    category_food_id: number;
    category: CategoryFoodT;
};
