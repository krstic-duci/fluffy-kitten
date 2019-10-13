<template>
  <section class="container">
    <div class="not__found__wrapper pt-header">
      <h1>
        Oops! We can't find the page you're looking for.
      </h1>
      <p>
        Please try our <router-link to="/">home page</router-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: '404'
}
</script>
