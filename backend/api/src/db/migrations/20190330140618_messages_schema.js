exports.up = function (knex, Promise) {
    return knex.schema.createTable('messages', function (t) {
        t.uuid('id').primary()
        t.string('conservationId', 36).notNull();
        t.boolean('isChannel').notNull();
        t.string('senderId', 36).notNull();
        t.text('content').nullable();
        t.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('messages');
};
