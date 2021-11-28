<script>
  // Should only trigger when hydrated
  console.log("Hello World");
</script>

<div class="content">
  <slot />
</div>

<style lang="scss">
  .content {
    text-align: center;
  }
</style>
