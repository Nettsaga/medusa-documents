"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250530123008 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250530123008 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "organizationNumber" text null;`);
    }
    async down() {
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "organizationNumber";`);
    }
}
exports.Migration20250530123008 = Migration20250530123008;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTA1MzAxMjMwMDguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI1MDUzMDEyMzAwOC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBa0Q7QUFFbEQsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsNEdBQTRHLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBRVEsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQywrRkFBK0YsQ0FBQyxDQUFDO0lBQy9HLENBQUM7Q0FFRjtBQVZELDBEQVVDIn0=