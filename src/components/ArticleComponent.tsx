import { Article } from "@/api/article";

export const ArticleComponent: React.FC<Article> = (article) => {
  return (
    <article key={article.id} className="flex flex-col w-full gap-5 p-2 border-2 rounded border-gray-600 md:flex-row items-center">
      <div className="w-96 min-w-96">
        <img
          src={article.thumbnail!}
          className="w-96 object-cover"
          alt={article.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-gray-900">
          <a href={article.url}>{article.title}</a>
        </h2>
        <p className="text-m text-gray-600">
          Like: {article.like}
        </p>
        <p className="text-m text-gray-600">
          {article.description}
        </p>
      </div>
    </article>
  )
}
