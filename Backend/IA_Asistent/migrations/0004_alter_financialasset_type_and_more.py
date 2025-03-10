# Generated by Django 5.1.2 on 2024-11-19 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IA_Asistent', '0003_alter_finance_current_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='financialasset',
            name='type',
            field=models.CharField(choices=[('Cuenta Bancaria', 'cuenta bancaria'), ('inversión', 'Inversión'), ('Activo fijo', 'Activoo fijo'), ('otro', 'Otro')], max_length=20),
        ),
        migrations.AlterField(
            model_name='financialliability',
            name='type',
            field=models.CharField(choices=[('deuda a corto plazo', 'Deuda a Corto Plazo'), ('deuda a largo plazo', 'Deuda a Largo Plazo'), ('reponsabilidad', 'Reponsabilidad'), ('pasivo', 'Pasivo')], max_length=20),
        ),
    ]
