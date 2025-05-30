"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250530113707 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250530113707 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "bankAccount" text null, add column if not exists "dueDays" integer null;`);
        this.addSql(`alter table if exists "document_invoice" add column if not exists "kidNumber" text null, add column if not exists "dueDate" timestamptz null;`);
    }
    async down() {
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "bankAccount", drop column if exists "dueDays";`);
        this.addSql(`alter table if exists "document_invoice" drop column if exists "kidNumber", drop column if exists "dueDate";`);
    }
}
exports.Migration20250530113707 = Migration20250530113707;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTA1MzAxMTM3MDcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI1MDUzMDExMzcwNy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBa0Q7QUFFbEQsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsc0pBQXNKLENBQUMsQ0FBQztRQUVwSyxJQUFJLENBQUMsTUFBTSxDQUFDLCtJQUErSSxDQUFDLENBQUM7SUFDL0osQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMseUhBQXlILENBQUMsQ0FBQztRQUV2SSxJQUFJLENBQUMsTUFBTSxDQUFDLDhHQUE4RyxDQUFDLENBQUM7SUFDOUgsQ0FBQztDQUVGO0FBZEQsMERBY0MifQ==