
exports.up = (knex) => knex.schema.createTable('friends', (table) => {
      table.increments('id');
      table.foreign('userId').references('users.id');
      table.integer('userId');
      table.foreign('friendId').references('users.id');
      table.integer('friendId');
      table.foreign('receiver').references('users.id');
      table.integer('receiver');
      table.integer('status').notNullable();
        // (  0 đã gửi lời mời
        //    1 đã xác nhận kết bạn
        //    2 đã chặn
        //    3 không còn là bạn bè  )
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('friends');
