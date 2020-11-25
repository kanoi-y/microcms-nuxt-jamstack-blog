<template>
  <ul>
 <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const page = params.p || '1'
    const limit = 2
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      `https://jamstackblog.microcms.io/api/v1/blog?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-API-KEY': 'ac4bdc72-42db-40aa-87ad-f41ca20e95e1' }
      }
    )
    return data
  }
}
</script>

<style>

</style>
