import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        //next: { revalidate: 60 }, // кэш на 1 минуту
        next: { revalidate: 3600 }, // кэш на 1 час
        //next: { revalidate: 86400 }, // кэш на 1 день
        //cache: 'force-cache', // forever
      })
    },
  },
})
