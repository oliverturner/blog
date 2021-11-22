<script>
  // Should only trigger when hydrated
  console.log("Hello World");
</script>

<div class="footer">
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  .footer {
    --bg: #0003;

    background: var(--bg);
  }

  .content {
    text-align: center;
  }
</style>
