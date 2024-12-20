# Generated by Django 5.1.2 on 2024-11-19 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IA_Asistent', '0004_alter_financialasset_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finance',
            name='budget',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='finance',
            name='current_balance',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='finance',
            name='total_expenses',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='finance',
            name='total_income',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='financialasset',
            name='type',
            field=models.CharField(choices=[('Cuenta Bancaria', 'cuenta bancaria'), ('Inversión', 'inversión'), ('Activo Fijo', 'activo fijo'), ('Otro', 'otro')], max_length=20),
        ),
        migrations.AlterField(
            model_name='financialliability',
            name='type',
            field=models.CharField(choices=[('Deuda a Corto Plazo', 'deuda a corto plazo'), ('Deuda a Largo Plazo', 'deuda a largo plazo'), ('Responsibilidad', 'responsabilidad'), ('Pasivo', 'pasivo')], max_length=20),
        ),
    ]
