import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { categoryUrl, newsUrl } from "../../../config/config";
import NewsCard from "./NewsCard";

function CategoryWiseNews() {
    const [categoriesNews, setCategoriesNews] = useState([]);

    const fetchCategoryNews = async () => {
        try {
            const catRes = await axios.get(categoryUrl.getAll);
            const categories = catRes.data.data;

            const categoryNewsPromises = categories.map(async (category) => {
                const newsRes = await axios.get(`${newsUrl.getCatWise}/${category._id}`);
                return {
                    categoryId: category._id,
                    categoryName: category.name,
                    news: newsRes.data.data
                };
            });

            const results = await Promise.all(categoryNewsPromises);
            setCategoriesNews(results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategoryNews();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 pb-10">
            {categoriesNews.map((catGroup) => (
                catGroup.news && catGroup.news.length > 0 && (
                    <div key={catGroup.categoryId} className="mb-10">
                        <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-3xl libertinus-serif-semibold uppercase">
                            {catGroup.categoryName}
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {catGroup.news.slice(0, 4).map((item) => (
                                <NewsCard key={item._id} news={item} />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </section>
    );
}

export default CategoryWiseNews;