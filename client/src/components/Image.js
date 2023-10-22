export default function Image({ src, ...rest }) {
    src = src && src.includes('https://') ? src
        : "https://food-wine.vercel.app/"+ src;

    return (
        <img {...rest} src={src} alt={''} />
    )
}