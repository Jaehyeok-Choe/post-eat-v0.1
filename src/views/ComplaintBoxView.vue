<template>
  <div class="complaint-box">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="What do people complain about?" />
      </p>
      <p class="control">
        <a class="button is-info"> Add </a>
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style>
@import 'bulma/css/bulma.min.css';
.complaint-box {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
