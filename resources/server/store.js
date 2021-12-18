import Store from 'electron-store'

const Streams = () => {
  /**
   * available streams 
   * the id value is considered unique (provided by socket.io)
   */
  const store = new Store({name:"stream-store"});
  
  /**
   * Stream object
   */
  var Stream = function(id, name) {
    this.name = name;
    this.id = id;
  }

  return {
    addStream : function(id, name) {
      var stream = new Stream(id, name);
      store.set(id,stream);
    },

    removeStream : function(id) {
      store.delete(id);
    },

    // update function
    update : function(id, name) {
      var stream = store.get(id);
      stream.name = name;
      store.set(id,stream);
    },

    getStream: function(id) {
      return store.get(id);
    },

    getStreams : function() {
      return Object.entries(store.store).map(([key, value]) => {
          return value;
        });
    }
  }
};

export default Streams;