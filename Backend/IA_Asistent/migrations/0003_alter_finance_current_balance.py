# Generated by Django 5.1.2 on 2024-11-18 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IA_Asistent', '0002_financialasset_financialliability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finance',
            name='current_balance',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
