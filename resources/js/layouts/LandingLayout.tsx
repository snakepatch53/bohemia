import Ligth from '@/components/landing/Ligth';
import { Head } from '@inertiajs/react';

export default function LandingLayout({
    title,
    variant = 'primary',
    children,
}: {
    title: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    children: React.ReactNode;
}) {
    return (
        <>
            <Head title={title} />
            <div className="relative z-10">{children}</div>
            <div className="fixed inset-0 bg-[#212430] [background:linear-gradient(to_right,#212430,#172b31_30%,#172b31_70%,#212430)]">
                <div className="fixed inset-0 -z-10 backdrop-blur-lg" />
                {variant == 'primary' && (
                    <>
                        <Ligth color="yellow" size="5" x="20" y="60" extend={4} />
                        <Ligth color="white" size="15" x="50" y="20" />
                        <Ligth color="blue" size="13" x="70" y="50" />
                        <Ligth color="blue" size="10" x="30" y="80" />
                        <Ligth color="red" size="20" x="70" y="70" extend={5} />
                        <Ligth color="green" size="30" x="30" y="10" />
                        <Ligth color="pink" size="10" x="50" y="25" />
                        <Ligth color="purple" size="30" x="70" y="15" />
                    </>
                )}
            </div>
        </>
    );
}
