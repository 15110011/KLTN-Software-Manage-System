import re


def manipulate_template(template, **kwargs):

    res = template

    contact = kwargs.get('contact', None)
    packages = kwargs.get('packages', None)

    if contact:
        contact_name = f'{contact.first_name} {contact.last_name}'
        res = re.sub(r'\$contact_name\$', contact_name, res)

    if packages:

        template = ''
        for p in packages:
            template += f'<h4>{p.name}</h4><ul>'
            for f in p.features.all():
                template += f'<li>{f.name}</li>'
            template += '</ul>'
        res = re.sub(r'\$packages_info\$', template, res)

    return res
