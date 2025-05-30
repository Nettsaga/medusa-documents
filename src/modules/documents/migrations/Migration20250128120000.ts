import { Migration } from '@mikro-orm/migrations';

export class Migration20250128120000 extends Migration {

    override async up(): Promise<void> {
        // Add bankAccount and dueDays columns to document_invoice_settings table
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "bankAccount" text null;`);
        this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "dueDays" integer null;`);

        // Add kidNumber and dueDate columns to document_invoice table
        this.addSql(`alter table if exists "document_invoice" add column if not exists "kidNumber" text null;`);
        this.addSql(`alter table if exists "document_invoice" add column if not exists "dueDate" timestamptz null;`);
    }

    override async down(): Promise<void> {
        // Remove the added columns
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "bankAccount";`);
        this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "dueDays";`);
        this.addSql(`alter table if exists "document_invoice" drop column if exists "kidNumber";`);
        this.addSql(`alter table if exists "document_invoice" drop column if exists "dueDate";`);
    }

} 