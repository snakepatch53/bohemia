export default function Ligth({ color, size, x, y, extend = 3 }) {
    return (
        <div
            className="absolute -z-20 flex justify-center"
            style={{
                top: `${y}%`,
                left: `${x}%`,
            }}
        >
            <div
                className="rounded-full"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 ${extend}rem 0.5rem ${color}`,
                }}
            />
        </div>
    );
}
