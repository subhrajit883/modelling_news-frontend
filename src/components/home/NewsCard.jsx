import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
    console.log("newscard", news)
    return (
        <Link
            to={`/news/${news.slug}`}
            className="group overflow-hidden rounded-lg bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="overflow-hidden">
                <img
                    src={news.thumbnail.url}
                    alt={news.title}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                />
            </div>

            <div className="p-5">

                <span className="rounded bg-red-600 px-3 py-1 text-xs font-semibold uppercase text-white libertinus-serif-regular" >
                    {news.category.name}
                </span>

                <h3 className="mt-4 line-clamp-2 text-xl font-bold transition group-hover:text-red-600 playfair-display-regular">
                    {news.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-gray-600 manrope-regular leading-relaxed" dangerouslySetInnerHTML={{ __html: news.content }} />


                {/* <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                    <span>{news.author}</span>
                    <span>{news.date}</span>
                </div> */}

            </div>
        </Link>
    );
};

export default NewsCard;