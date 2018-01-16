const db = require('../config.js');

const Favorite = db.Model.extend({
  tableName: 'favorites',
  hasTimestamps: false,
  userId: function() {
    this.belongsTo(User, 'id');
  }
})