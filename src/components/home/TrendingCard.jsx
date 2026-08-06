import { Link } from "react-router-dom";

const TrendingCard = ({ news, index }) => {
    return (
        <Link
            to={`/news/${news.slug}`}
            className="flex gap-4 border-b pb-5 last:border-none"
        >
            <span className="text-3xl font-bold text-red-600 libertinus-serif-bold">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div>

                <p className="text-xs font-semibold uppercase text-red-600 libertinus-serif-bold">
                    {news.category.name}
                </p>

                <h4 className="mt-1 font-semibold transition hover:text-red-600 playfair-display-regular">
                    {news.title}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                    {news.date}
                </p>

            </div>
        </Link>
    );

};

export default TrendingCard;