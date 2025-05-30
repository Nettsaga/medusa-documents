"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250128120001 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250128120001 extends migrations_1.Migration {
    async up() {
        // Add organizationNumber column to document_invoice_settings table
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "organizationNumber" text null;`);
    }
    async down() {
        // Remove the organizationNumber column
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "organizationNumber";`);
    }
}
exports.Migration20250128120001 = Migration20250128120001;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTAxMjgxMjAwMDEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI1MDEyODEyMDAwMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBa0Q7QUFFbEQsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUV6QyxLQUFLLENBQUMsRUFBRTtRQUNiLG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLDRHQUE0RyxDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2YsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsK0ZBQStGLENBQUMsQ0FBQztJQUNqSCxDQUFDO0NBRUo7QUFaRCwwREFZQyJ9