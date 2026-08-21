import { defineType, defineField } from 'sanity'

export const bookmark = defineType({
  name: 'bookmark',
  title: 'Bookmark',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'topic',
      title: 'Topic / Folder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'isPdf',
      title: 'PDF',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'image',
      title: 'Image Preview',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      topic: 'topic',
      isPdf: 'isPdf',
    },

    prepare({ title, topic, isPdf }) {
      return {
        title,
        subtitle: `${topic}${isPdf ? ' · PDF' : ''}`,
      }
    },
  },
})