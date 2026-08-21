import type { Metadata } from "next"

import BookmarkFolder from "@/components/BookmarkFolder"

import { getBookmarks } from "@/lib/sanity.queries"

import { sampleBookmarks } from "@/lib/sample-data"

export const metadata: Metadata = {

title:"Bookmarks",

description:"Bookmark library",

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

<h1 className="text-5xl font-black mb-5">

Bookmarks

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