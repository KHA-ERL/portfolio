import Link from "next/link"
import { slugify } from "@/lib/slugify"

interface Props {
  topic: string
  count: number
}

export default function BookmarkFolder({
  topic,
  count,
}: Props) {

  return (

    <Link
      href={`/bookmarks/${slugify(topic)}`}
      className="finder-folder"
    >

      <div className="folder-body">

        {/* Back layer */}
        <div className="folder-back" />

        {/* Middle layer */}
        <div className="folder-middle" />

        {/* Folder tab */}
        <div className="folder-tab" />

        {/* Front layer */}
        <div className="folder-front" />

      </div>

      <div className="folder-label">
        <h3>{topic}</h3>
        <p>{count} {count === 1 ? "article" : "articles"}</p>
      </div>

    </Link>

  )

}