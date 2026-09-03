import type { Metadata } from "next"

import { Breadcrumbs } from "@/components/Breadcrumbs"
import BookmarkFolder from "@/components/BookmarkFolder"

import { getBookmarks } from "@/lib/sanity.queries"

import { sampleBookmarks } from "@/lib/sample-data"
import { absoluteUrl, getJsonLd } from "@/lib/site"

export const metadata: Metadata = {

title:"Engineering Bookmarks",

description:"Curated engineering bookmarks and technical references collected by Michael Paul.",

alternates:{

canonical:"/bookmarks",

},

}

export default async function BookmarksPage(){

let bookmarks=sampleBookmarks

try{

if(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID){

const sanityBookmarks=await getBookmarks()

if(sanityBookmarks.length)

bookmarks=sanityBookmarks

}

}catch{}

const topics=

Array.from(

new Set(bookmarks.map(b=>b.topic))

).sort()

return(

<main className="max-w-7xl mx-auto px-8 py-20">
<Breadcrumbs items={[{label:"Bookmarks",href:"/bookmarks"}]} />
<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html:getJsonLd({
"@context":"https://schema.org",
"@type":"CollectionPage",
name:"Engineering Bookmarks",
url:absoluteUrl("/bookmarks"),
hasPart:topics.map(topic=>({
"@type":"CollectionPage",
name:`${topic} Bookmarks`,
url:absoluteUrl(`/bookmarks/${encodeURIComponent(topic)}`),
})),
}),
}}
/>

<h1 className="text-5xl font-black mb-5">

Engineering Bookmarks

</h1>

<p className="mb-20 opacity-70">

My knowledge library.

</p>

<div className="finder-grid">

{topics.map(topic=>(

<BookmarkFolder

key={topic}

topic={topic}

count={

bookmarks.filter(

b=>b.topic===topic

).length

}

/>

))}

</div>

</main>

)

}
