const SideNewsCard = ({
    image,
    category,
    title,
    date
}) => {

    return (

        <div className="group relative h-63.25 overflow-hidden rounded">

            <img
                src={image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">

                <p className="mb-2 text-xs uppercase">
                    {category}
                </p>

                <h3 className="mb-2 text-2xl font-bold leading-tight">
                    {title}
                </h3>

                <p className="text-sm">
                    {date}
                </p>

            </div>

        </div>

    );
};

export default SideNewsCard;