import { Migration } from '@mikro-orm/migrations';

export class Migration20250530123008 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "document_invoice_settings" add column if not exists "organizationNumber" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "document_invoice_settings" drop column if exists "organizationNumber";`);
  }

}
