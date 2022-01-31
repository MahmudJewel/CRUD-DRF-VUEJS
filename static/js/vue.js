console.log("connected");
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

new Vue({
  el: "#slist",
  delimiters: ["[[", "]]"],
  data: function () {
    return {
        allTasks: [],
        newTask: false, // for edit on same place
      //   newTaskValue: "", // for edit on same place
      //   editId: null, // for edit on same place
      //   oldTask: {}, // for edit on same place
    };
  },
  methods: {
    // list all task
    getTasks: function () {
      axios
        .get("/api/list")
        .then((resp) => {
          this.allTasks = resp.data;
        })
        .catch((error) => console.log(error));
    },

    // add task 
    addTask: function () {
        let newTask = {
            name: this.newName,
            sid: this.newID,
            varsity: this.newVarsity,
        }
        axios
            .get("/api/list")
            .then((resp)=>{
                this.newTask = false;
                this.allTasks.push(resp.data);
            })
            .catch((error)=> console.log(error));
    },
  },

  mounted: function () {
    this.getTasks();
  },
});

new Vue({
    el: "#addTask",
    delimiters: ["[[", "]]"],
    data: function () {
      return {
          allTasks: [],
          newTask: false, // for edit on same place
          newName: "", // for edit on same place
          newID: "",
          newVarsity: "",
        //   editId: null, // for edit on same place
        //   oldTask: {}, // for edit on same place
      };
    },
    methods: {
      // list all task
      getTasks: function () {
        axios
          .get("/api/list")
          .then((resp) => {
            this.allTasks = resp.data;
          })
          .catch((error) => console.log(error));
      },
  
      // add task 
      addTask: function () {
          let newTask = {
              name: this.newName,
              sid: this.newID,
              varsity: this.newVarsity,
          }
          axios
              .post("/api/list", newTask)
              .then((resp)=>{
                  // this.newTask = false;
                  this.allTasks.push(resp.data);
              })
              .catch((error)=> console.log(error));
      },
    },
  
    mounted: function () {
      this.getTasks();
    },
  });
