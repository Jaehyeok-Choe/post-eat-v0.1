<template>
  <div class="complaint-box">
    <!-- page title -->
    <div class="title has-text-centered">Complaint Box</div>
    <!-- input -->
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="What do people complain about?" />
      </p>
      <!-- add button -->
      <p class="control">
        <a class="button is-info"> Add </a>
      </p>
    </div>
    <!-- card -->
    <div class="card mb-5" v-for="i in 3" :key="i">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">Shave my butt</div>
            <div class="column is-5 has-text-right">
              <button class="button is-light is-small">&check;</button>
              <button class="button is-danger ml-2 is-small">&cross;</button>
            </div>
          </div>
        </div>
      </div>
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
