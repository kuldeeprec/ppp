<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="alert alert-primary border-primary p-2 m-0" role="alert">
        <h3 class="alert-heading text-center">login</h3>
        <hr class="m-2" />
        <!-- <p class="mb-0 text-center">
          You have
          <span
            class="badge badge-pill badge-light text-dark"
            style="font-size: 0.9em;"
            v-bind:class="{'text-danger': hasError }"
          >{{ remainingCount }}</span> characters
        </p> -->
      </div>
    </div>
    <br />
    <form @submit.prevent="login">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="form-group">
            <label
              >enter email id<br />
              <!-- <select class="select" id="select-code">
    <option value="">Select a code</option>
    <option value="value1">Code 1</option>
    <option value="value2">Code 2</option>
    <option value="value3">Code 3</option>
    <option value="value4">Code 4</option>
</select>
<button id="code-btn">confirm</button><br>
<input id='input' name="my-quote" type="text" placeholder="type of password ">

document.getElementById('code-btn').onclick = () => {
let e = document.getElementById('select-code');
document.getElementById('input').value =  e.options[e.selectedIndex].text;
} -->
            </label>
            <input
              id="title"
              type="option"
              class="form-control"
              v-model="note.email"
              placeholder="enter email id"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="form-group">
            <label>enter password:</label>
            <input
              type="password"
              id="body"
              class="form-control"
              v-model="note.password"
              v-on:keyup="countdown"
              placeholder="Enter password"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group">
          <div class="col-md-6 d-flex">
            <button class="btn btn-primary mr-4" :disabled="isDisabled">
              login
            </button>
            <button
              type="button"
              class="btn btn-warning mr-4"
              :disabled="!note.title && !note.body"
              @click.prevent="clearInputs()"
            >
              Clear
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="backToNotes()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {},
      maxCount: 280,
      remainingCount: 280,
      password: "",
      email: "",
      hasError: false,
      isDisabled: false
    };
  },

  methods: {
    login() {
      const uri = "/notes/login";
      this.axios.post(uri, this.note).then(() => {
        this.$router.push({ name: "notes" });
      });
    },
    clearInputs() {
      this.note = {};
      this.isDisabled = true;
      this.remainingCount = 280;
    },
    backToNotes() {
      this.$router.push("/");
    }
  }
};
</script>
