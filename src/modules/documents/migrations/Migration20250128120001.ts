import { Migration } from '@mikro-orm/migrations';

export class Migration20250128120001 extends Migration {

    override async up(): Promise<void> {
        // Add organizationNumber column to document_invoice_settings table
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "organizationNumber" text null;`);
    }

    override async down(): Promise<void> {
        // Remove the organizationNumber column
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "organizationNumber";`);
    }

} 