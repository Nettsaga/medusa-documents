"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250128120000 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250128120000 extends migrations_1.Migration {
    async up() {
        // Add bankAccount and dueDays columns to document_invoice_settings table
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "bankAccount" text null;`);
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "dueDays" integer null;`);
        // Add kidNumber and dueDate columns to document_invoice table
        this.addSql(`alter table if exists "document_invoice" add column if not exists "kidNumber" text null;`);
        this.addSql(`alter table if exists "document_invoice" add column if not exists "dueDate" timestamptz null;`);
    }
    async down() {
        // Remove the added columns
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "bankAccount";`);
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "dueDays";`);
        this.addSql(`alter table if exists "document_invoice" drop column if exists "kidNumber";`);
        this.addSql(`alter table if exists "document_invoice" drop column if exists "dueDate";`);
    }
}
exports.Migration20250128120000 = Migration20250128120000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTAxMjgxMjAwMDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI1MDEyODEyMDAwMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBa0Q7QUFFbEQsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUV6QyxLQUFLLENBQUMsRUFBRTtRQUNiLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7UUFDbkgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1FBRWxILDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLDBGQUEwRixDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLE1BQU0sQ0FBQywrRkFBK0YsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNmLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLHdGQUF3RixDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxNQUFNLENBQUMsNkVBQTZFLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsTUFBTSxDQUFDLDJFQUEyRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztDQUVKO0FBcEJELDBEQW9CQyJ9