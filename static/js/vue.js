console.log("connected");
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// list, delete, edit 
new Vue({
  el: "#slist",
  delimiters: ["[[", "]]"],
  data: function () {
    return {
        allTasks: [],
        newTask: false,
        currentTask: {},
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

    // delete task 
    deleteTask: function(id){
      taskList = [];
      axios
      .delete('api/edit/'+id)
      .then((aa) => {
        for (let i=0; i<this.allTasks.length; i++){
          if(this.allTasks[i].id != id){
            tsk = this.allTasks[i]
            taskList.push(tsk)
          }
        }
        this.allTasks=taskList
      })
      .catch((error)=> console.log(error));
    },

    // update 
    getTaskfromID: function (id) {
      axios
      .get('api/edit/'+id)
      .then((response)=>{
        this.currentTask = response.data
      })
      .catch((error)=>console.log(error));
    },
  },

  mounted: function () {
    this.getTasks();
  },
});

// vue for add task 
new Vue({
    el: "#addTask",
    delimiters: ["[[", "]]"],
    data: function () {
      return {
          allTasks: [],
          newTask: false,
          newName: "",
          newID: "",
          newVarsity: "",
      };
    },
    methods: {
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
                  this.newTask = false;
              })
              .catch((error)=> console.log(error));
      },
    },
  });

new Vue({
  el: "#update",
  delimiters: ["[[", "]]"],
  data: function () {
    return {
        allTasks: [],
        newName: "", // for edit on same place
        newID: "",
        newVarsity: "",
        pk:"",
    };
  },

  methods: {
    // list all task
    getTasks: function () {
      axios
        .get("/api/edit/"+this.pk)
        .then((resp) => {
          this.allTasks = resp.data;
          console.log('Hello')
          console.log(resp.data)
        })
        .catch((error) => console.log(error));
    },
    
  },

  mounted: function() {
    this.getTasks();
  },

});