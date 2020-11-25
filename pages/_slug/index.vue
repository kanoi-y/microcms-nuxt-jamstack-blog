<template>
  <main class="main">
    <h1 class="title">{{  data.title }}</h1>
    <p class="publishedAt">{{ data.publishedAt }}</p>
    <p class="category">{{ data.category && data.category.name }}</p>
<ul class="lists">
  <li :class="`list ${item.name}`" v-for="item in toc" :key="item.id">
    <n-link v-scroll-to="`#${item.id}`" to>
      {{ item.text }}
    </n-link>
  </li>
</ul>
    <div class="post" v-html="data.body"></div>
  </main>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://jamstackblog.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': 'ac4bdc72-42db-40aa-87ad-f41ca20e95e1' }
      }
    )
    const $ = cheerio.load(data.body);
    const headings = $('h1, h2').toArray();
    const toc = headings.map(data => ({
  text: data.children[0].data,
  id: data.attribs.id,
  name: data.name}));
    return {data, toc};
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 960px;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
}

.publishedAt {
  margin-bottom: 40px;
}

.post {
  & > h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
  }

  & > h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 16px;
    border-bottom: 1px solid #ddd;
  }

  & > p {
    line-height: 1.8;
    letter-spacing: 0.2px;
  }

  & > ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
}

</style>