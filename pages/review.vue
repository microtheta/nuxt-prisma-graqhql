<template>
  <div class="root">
    <div class="review-card" v-for="review in reviews" :key="review.id">
      <div class="review-item">{{review.name}}</div>
      <div class="review-item"><b>Rating: </b>{{review.rating}}</div>
      <div class="review-item">{{review.review}}</div>
    </div>
  </div>
</template>
<style scoped>
.root {
  display: flex;
  flex-wrap: wrap;
}
.review-card {
  border: 1px solid;
  width: 30%;
  margin: 15px;
}
.review-item {
  padding: 15px;
}
</style>
<script>

const graphQuery = {query : `
query {
  reviews(id: 1) {
    id
    name
    rating
    review
  }
}
`
}

export default {
  name: 'Reviews',
  data: () => {
    return {
      reviews: []
    }
  },
  mounted() {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(graphQuery)
    }).then(data => data.json()).then(data => {
      this.reviews = data.data.reviews
      console.log(this.reviews)
    })
  }
}
</script>

