<?php

namespace Database\Seeders;

use App\Models\CategoryFood;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryFoodSeeder extends Seeder
{
    public function run(): void
    {
        CategoryFood::create([
            'id' => 1,
            'name' => 'Comida',
            'description' => 'Platos de comida'
        ])->foods()->createMany([
            ['name' => 'Alitas BBQ Hard Rock', 'description' => 'Deliciosas alitas bañadas en salsa BBQ a su elección, acompañadas de ensalada fresca, patacones o yuca', 'price' => '6.99'],
            ['name' => 'Nachos Bohemios', 'description' => 'Exquisita carne molida con salsa pomodoro, nuestro delicioso queso líquido con pico de gallo y guacamole', 'price' => '3.99'],
            ['name' => 'Yucas Rock and Roll', 'description' => 'Yucas fritas acompañadas de lonito en salsa de vino tinto', 'price' => '2.99'],
            ['name' => 'Picada Bohemia', 'description' => 'Yuca, chorizo, lomito de res en salsa blanca, pechuga de pollo en salsa de mostaza, camarones bohemios', 'price' => '9.99'],
            ['name' => 'Quesadillas Rancheras', 'description' => 'Carne a la plancha rebosada en nuestra salsa texmex, acompañada de guacamole y yuca frita', 'price' => '5.99'],
            ['name' => 'Hamburguesa Bohemia', 'description' => 'Pan de molde elaborado artesanalmente, 200 gr de carne molida, queso líquido, aguacate, camarón, lechuga, tomate, tocino, acompañado de yuca frita', 'price' => '6.99'],
            ['name' => 'Ensalada de Camarón', 'description' => 'Delisiosos camarones en salsa textmex expuestos sobre una cama de nuestros productos del huerto', 'price' => '5.99'],
            ['name' => 'Ensalada César', 'description' => 'Pechuga de pollo a la plancha expuesta sobre una cama de nuestros productos del huerto', 'price' => '4.99'],
        ]);

        CategoryFood::create([
            'id' => 2,
            'name' => 'Cócteles',
            'description' => 'Bebidas alcohólicas'
        ])->foods()->createMany([
            ['name' => 'Michelada de limón', 'price' => '5'],
            ['name' => 'Michelada de maracuyá', 'price' => '5'],
            ['name' => 'Mojito clásico de limón', 'price' => '5'],
            ['name' => 'Mojito de mora', 'price' => '5'],
            ['name' => 'Mojito de maracuyá', 'price' => '5'],
            ['name' => 'Cuba libre', 'price' => '5'],
            ['name' => 'Saltamontes', 'price' => '6'],
            ['name' => 'Tequila Sunrise', 'price' => '5'],
            ['name' => 'Sex on beach', 'price' => '5'],
            ['name' => 'Laguna azul', 'price' => '5'],
            ['name' => 'Laguna azul', 'price' => '5'],
            ['name' => 'Coctel Bohemio', 'price' => '6'],
            ['name' => 'Padrino', 'price' => '6'],
            ['name' => 'Margarita', 'price' => '6'],
            ['name' => 'Shot de tequila', 'price' => '5'],
            ['name' => 'Gin tonic', 'price' => '5'],
            ['name' => 'Orgasmo', 'price' => '6'],
            ['name' => 'Piña colada', 'price' => '6'],
        ]);

        CategoryFood::create([
            'id' => 3,
            'name' => 'Para Cantar',
            'description' => 'Bebidas para cantar'
        ])->foods()->createMany([
            ['name' => 'Mata Bohemios pequeño', 'price' => '20'],
            ['name' => 'Mata Bohemios grande', 'price' => '35']
        ]);

        CategoryFood::create([
            'id' => 4,
            'name' => 'Botellas',
            'description' => 'Botellas de licor'
        ])->foods()->createMany([
            ['name' => 'Jhonny Walker', 'price' => '100'],
            ['name' => 'Buchanans', 'price' => '90'],
            ['name' => 'Jack Daniels', 'price' => '90'],
            ['name' => 'Jose Cuervo', 'price' => '75'],
            ['name' => 'Jhonny Rojo', 'price' => '45'],
            ['name' => 'Jhagger', 'price' => '50'],
            ['name' => 'Tequila charro', 'price' => '35'],
        ]);

        CategoryFood::create([
            'id' => 5,
            'name' => 'Vinos',
            'description' => 'Vinos'
        ])->foods()->createMany([
            ['name' => 'Vino herbido Jarra', 'price' => '15'],
            ['name' => 'Sangria Jarra', 'price' => '15'],
            ['name' => 'calimocha Copa', 'price' => '5'],
            ['name' => 'Borgoña Copa', 'price' => '5'],
            ['name' => 'Borgoña Jarra', 'price' => '15'],
            ['name' => 'Copa de Vino', 'price' => '4'],
        ]);
    }
}
