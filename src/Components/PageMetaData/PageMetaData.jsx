export default function PageMetaData({ title = "Cartify",
    description = "Cartify",
    keywords = "Cartify",
    author = "Cartify Team" }) {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
        </>
    )
}