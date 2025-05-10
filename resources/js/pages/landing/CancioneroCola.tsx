import CancioneroHeader from '@/components/landing/CancioneroHeader';
import CancioneroLayout from '@/layouts/LandingLayout';
import { SongRequestT } from '@/types';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    songRequests: {
        data: SongRequestT[];
        current_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
};

export default function CancioneroCola({ songRequests }: Props) {
    let lastDate = null;
    return (
        <CancioneroLayout title="Cancionero" variant="secondary">
            <CancioneroHeader />
            <section className="container mx-auto mt-10 flex flex-col items-center gap-3">
                {songRequests.data.map((order) => {
                    let Component = null;
                    const date = new Date(order.created_at).toDateString();
                    if (lastDate != date) {
                        lastDate = date;
                        Component = (
                            <h2
                                className="mb-4 w-full text-center text-lg font-bold text-white/80 capitalize"
                                style={{
                                    textShadow: '1px 0 1px black, 0 1px 1px black, -1px 0 1px black, 0 -1px 1px black',
                                }}
                            >
                                {order.date_str}
                            </h2>
                        );
                    }
                    return (
                        <div className="flex w-full flex-col items-center" key={order.id}>
                            {Component}
                            <Item
                                number={order?.song?.id}
                                title={order?.song?.artist + ' - ' + order?.song?.title}
                                by={order?.customer?.name}
                                date={order.date_diff}
                            />
                        </div>
                    );
                })}
            </section>

            {/* <section className="container flex justify-center gap-2 pt-5 pb-10">
                {orders?.prev_page_url && (
                    <Button
                        onClick={() => {
                            setPageUrl(orders?.prev_page_url);
                        }}
                        icon={faChevronLeft}
                        disabled={loading}
                    />
                )}
                <Button text={orders?.current_page} disabled />
                {orders?.next_page_url && (
                    <Button
                        onClick={() => {
                            setPageUrl(orders?.next_page_url);
                        }}
                        icon={faChevronRight}
                        disabled={loading}
                    />
                )}
            </section> */}
        </CancioneroLayout>
    );
}

function Item({ number, title, by, date }) {
    return (
        <div className="flex w-full max-w-[800px] items-center gap-3 rounded bg-black/10 p-2 sm:p-5">
            <div className="text-c1 flex aspect-square h-20 flex-col items-center justify-center rounded bg-black/20">
                <FontAwesomeIcon className="text-lg" icon={faMusic} />
                <span className="text-sm font-bold">#{number}</span>
            </div>
            <div className="flex flex-col">
                <h4 className="text-c2 block max-w-52 overflow-hidden text-lg font-bold text-nowrap text-ellipsis opacity-70 sm:max-w-none">
                    {title}
                </h4>
                <h3 className="block max-w-52 overflow-hidden text-nowrap text-ellipsis sm:max-w-none">
                    <b className="text-c1">Para: </b>
                    <span className="opacity-80">{by}</span>
                </h3>
                <p className="block max-w-52 overflow-hidden text-[0.75rem] text-nowrap text-ellipsis capitalize opacity-60 sm:max-w-none">{date}</p>
            </div>
        </div>
    );
}

// function Button({ onClick = () => {}, icon = null, text = null, disabled = false }) {
//     return (
//         <button
//             className={cn('flex aspect-square w-10 items-center justify-center rounded bg-black/20', {
//                 'cursor-not-allowed opacity-50': disabled,
//             })}
//             onClick={onClick}
//             disabled={disabled}
//         >
//             {icon && <FontAwesomeIcon className="opacity-90" icon={icon} />}
//             {text && <span>{text}</span>}
//         </button>
//     );
// }
