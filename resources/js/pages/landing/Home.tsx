import LandingLayout from '@/layouts/LandingLayout';
import { asset } from '@/lib/utils';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBowlFood, faInfoCircle, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <LandingLayout title="Inicio">
            <div className="container mx-auto max-w-4xl">
                <img className="mx-auto aspect-video w-full max-w-48 object-contain" src={asset('img/info/logo.webp')} />
                <h1
                    className="font-title2 text-c1 text-center font-bold uppercase sm:text-xl"
                    style={{
                        textShadow: '0 -1px 1px #000, 0 1px 1px #000, 0 0 1px #000',
                    }}
                >
                    🫡 ¿Cómo podemos ayudarte? 😉
                </h1>
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                    <Item
                        href={route('cancionero.cola')}
                        name="Cancionero"
                        text="¿Quieres cantar?"
                        icon={faMicrophoneAlt}
                        // color de cantar
                        color="#81389a"
                    />

                    <Item to="/comida" name="Menu" text="¿Quieres comer?" icon={faBowlFood} color="#c32872" />
                    <Item
                        as="a"
                        href="https://www.facebook.com/LaBohemiaMacas"
                        target="_blank"
                        rel="noreferrer"
                        name="Facebook"
                        text="@LaBohemiaMacas"
                        icon={faFacebook}
                        color="#2c74dc"
                    />
                    <Item to="/frontpage" name="Información" text="¿Quieres saber más?" icon={faInfoCircle} color="#31bbff" />
                </div>
                <p className="mt-20 text-center text-3xl sm:text-4xl">🎤🍲</p>
                <p className="font-title text-c2 mb-20 text-center text-3xl sm:text-5xl">El placer de cantar y comer en un solo lugar.</p>
            </div>
        </LandingLayout>
    );
}

function Item({ as = Link, name, text, icon, color, ...props }: { [key: string]: any }) {
    const Component = as;
    return (
        <Component
            {...props}
            className="flex aspect-video flex-col items-center justify-center gap-3 rounded bg-black/20 transition hover:scale-105 hover:bg-black/30 sm:p-5"
        >
            <h2 className="text-c2 text-lg font-bold uppercase opacity-80">{name}</h2>
            <FontAwesomeIcon className="text-c1 text-5xl md:text-7xl" icon={icon} style={{ color }} />
            <h3 className="text-center text-lg text-balance opacity-70">{text}</h3>
        </Component>
    );
}
