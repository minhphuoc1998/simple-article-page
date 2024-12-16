import { useEffect, useState } from "react";
import { Article, ArticleSearchParams, getArticleList } from "@/api/article";
import { ArticleComponent } from "@/components/ArticleComponent";
import { getSiteList, Site } from "@/api/site";
import { SiteComponent } from "@/components/SiteComponent";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);  
  const [sites, setSites] = useState<Site[]>([]);

  const getArticles = async () => {
    const { site, page, pageSize, sortBy, ascending } = router.query;
    const params: ArticleSearchParams = { 
      origin: (site as string) || undefined,
      page: page ? (parseInt(page as string) || 1) : undefined,
      pageSize: pageSize ? (parseInt(pageSize as string) || undefined) : undefined,
      sortBy: sortBy as string,
      ascending: ascending ? ascending === 'true' : undefined
    }
    const data = await getArticleList(params);
    setArticles(data);
  }

  const getSites = () => {
    const data = getSiteList();
    setSites(data);
  }

  const handleNextPage = () => {
    const currentPage = parseInt(router.query.page as string) || 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: currentPage + 1 }
    })
  }

  useEffect(() => {
    getArticles();
  }, [router.query])

  useEffect(() => {
    getSites();
  },[])

  return (
    <div className="flex flex-col m-10 gap-5 items-center">
      <h1></h1>
      <div className="flex gap-10">
        {sites.map((site) => (<SiteComponent {...site} />))}
      </div>
      <div className="flex flex-col gap-3">
        {articles.map((article) => (<ArticleComponent {...article} />))}
      </div>
      <button onClick={handleNextPage} className="p-2 px-4 bg-gray-600 text-white rounded">
        Next Page
      </button>
    </div>
  );
}
