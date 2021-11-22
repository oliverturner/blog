<script>
  // Should only trigger when hydrated
  console.log("Hello World");
</script>

<div class="footer">
  <div class="content">© 2021 Oliver Turner </div>
</div>

<style lang="scss">
  .footer {
    background: var(--violet-5);

    @media (--mq-medium) {
      background-color: var(--orange-5);
    }

    @media (--mq-large) {
      background-color: var(--yellow-5);
    }

    @media (--mq-xlarge) {
      background-color: var(--green-5);
    }
  }

  .content {
    text-align: center;
  }
</style>
