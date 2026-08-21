import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { bookmark } from './bookmark'
import about from './about'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, bookmark, about, project],
}