import { Migration } from '@mikro-orm/migrations';

export class Migration20250530113707 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "bankAccount" text null, add column if not exists "dueDays" integer null;`);

    this.addSql(`alter table if exists "document_invoice" add column if not exists "kidNumber" text null, add column if not exists "dueDate" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "bankAccount", drop column if exists "dueDays";`);

    this.addSql(`alter table if exists "document_invoice" drop column if exists "kidNumber", drop column if exists "dueDate";`);
  }

}
