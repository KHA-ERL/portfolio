'use client'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schema } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Michael Paul — Portfolio',

  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About Page')
              .id('about')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('singleton-about')
              ),

            S.divider(),

            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('bookmark').title('Bookmarks'),
          ]),
    }),

    visionTool(),
    codeInput(),
  ],

  schema,
})