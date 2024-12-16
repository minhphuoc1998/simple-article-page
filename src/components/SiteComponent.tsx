import { Site } from "@/api/site"
import { useRouter } from "next/router";


export const SiteComponent: React.FC<Site> = (site) => {
  const router = useRouter();

  const handleChangeSite = () => {
    const currentSite = site.origin;
    router.push({
      pathname: router.pathname,
      query: { site: currentSite }
    })
  }

  return (
    <div className="p-1 border-2 rounded border-gray-600">
      <div
        className="flex items-center gap-2"
        onClick={handleChangeSite}
      >
        <div className="w-10 min-w-10">
          <img
            src={site.logo!}
            className="w-10 object-cover"
          />
        </div>
        <div className="">
          <p className="text-m text-gray-600">{site.siteName}</p>
        </div>
      </div>
    </div>
  )
}
